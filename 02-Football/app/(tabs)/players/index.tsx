import FilterBadge from "@/components/FilterBadge";
import PlayerCard from "@/components/PlayerCard";
import SearchBar from "@/components/SearchBar";
import { Player, PlayerPosition, PlayerPositionLabel, PlayerSnapshotData } from "@/types/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text } from "react-native";

type PlayerPositionFilter = {
  label: PlayerPositionLabel;
  value: PlayerPosition;
  active: boolean;
  onClick: () => void;
};

const PlayersScreen = () => {
  const db = getFirestore();
  const [players, setPlayers] = useState<Player[]>([]);
  const [filters, setFilters] = useState<PlayerPositionFilter[]>([
    { label: "GK", value: "Goalkeeper", active: false, onClick: () => toggleFilter("Goalkeeper") },
    { label: "DF", value: "Defender", active: false, onClick: () => toggleFilter("Defender") },
    { label: "MF", value: "Midfielder", active: false, onClick: () => toggleFilter("Midfielder") },
    { label: "FW", value: "Forward", active: false, onClick: () => toggleFilter("Forward") },
  ]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(players);
  const [searchString, setSearchString] = useState<string>("");
  const [searchBarClicked, setSearchBarClicked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleFilter = (position: PlayerPosition) => {
    setFilters(previousFilters =>
      previousFilters.map(filter =>
        filter.value === position ? { ...filter, active: !filter.active } : filter
      )
    );
  };

  const loadPlayers = () => {
    setLoading(true);
    getDocs(collection(db, "players"))
      .then(querySnapshot => {
        const queryPlayers: Player[] = [];
        querySnapshot.forEach(async snapshot => {
          const snapshotData = { ...snapshot.data() } as PlayerSnapshotData;
          const player = { id: snapshot.id, ...snapshotData };
          queryPlayers.push(player);
        });
        setPlayers(queryPlayers);
      })
      .catch(() => Alert.alert("Error loading players data"))
      .finally(() => setLoading(false));
  };

  useEffect(loadPlayers, []);

  useEffect(() => {
    const lowerCaseSearchString = searchString.toLowerCase();
    const searchedPlayers = lowerCaseSearchString ? players.filter(player => player.name.toLowerCase().includes(lowerCaseSearchString)) : players;

    if (filters.every(filter => !filter.active)) {
      setFilteredPlayers(searchedPlayers);
      return;
    }

    setFilteredPlayers(searchedPlayers.filter(player => filters.find(filter => filter.active && filter.value === player.position)));
  }, [players, filters, searchString]);

  const removePlayer = (player: Player) => {
    Alert.alert("Remove player", `Are you sure you want to remove ${player.name}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => setPlayers(players.filter(p => p.id !== player.id)),
      },
    ]);
  };

  if (loading) {
    <Text style={styles.text}>Loading...</Text>;
  }

  return (
    <>
      <SearchBar
        placeholder="Enter player name..."
        clicked={searchBarClicked}
        setClicked={setSearchBarClicked}
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <FlatList
        data={filters}
        keyExtractor={filter => filter.label}
        horizontal
        renderItem={({ item }) => (
          <FilterBadge
            label={item.label}
            active={item.active}
            onClick={item.onClick}
          />
        )}
        contentContainerStyle={{
          marginHorizontal: "auto",
          marginBottom: 20,
          gap: 20,
          paddingVertical: 10,
          height: 60,
        }}
      />
      <FlatList
        data={filteredPlayers}
        keyExtractor={player => player.id}
        renderItem={({ item }) => (
          <PlayerCard
            player={item}
            edit={() => console.log(`Editing ${item.name} (id: ${item.id})`)}
            remove={() => removePlayer(item)}
          />
        )}
        ListEmptyComponent={<Text style={styles.text}>No players found</Text>}
        refreshing={loading}
        onRefresh={loadPlayers}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 32,
    marginTop: 10,
  },
});

export default PlayersScreen;
