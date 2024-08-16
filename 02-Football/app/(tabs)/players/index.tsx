import FilterBadge from "@/components/FilterBadge";
import PlayerCard from "@/components/PlayerCard";
import SearchBar from "@/components/SearchBar";
import { initialPlayers } from "@/db/players";
import { Player, PlayerPosition, PlayerPositionLabel } from "@/types/app";
import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

type PlayerPositionFilter = {
  label: PlayerPositionLabel;
  value: PlayerPosition;
  active: boolean;
  onClick: () => void;
};

const PlayersScreen = () => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [filters, setFilters] = useState<PlayerPositionFilter[]>([
    { label: "GK", value: "Goalkeeper", active: false, onClick: () => toggleFilter("Goalkeeper") },
    { label: "DF", value: "Defender", active: false, onClick: () => toggleFilter("Defender") },
    { label: "MF", value: "Midfielder", active: false, onClick: () => toggleFilter("Midfielder") },
    { label: "FW", value: "Forward", active: false, onClick: () => toggleFilter("Forward") },
  ]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(players);
  const [searchString, setSearchString] = useState<string>("");
  const [searchBarClicked, setSearchBarClicked] = useState<boolean>(false);

  const toggleFilter = (position: PlayerPosition) => {
    setFilters(previousFilters =>
      previousFilters.map(filter =>
        filter.value === position ? { ...filter, active: !filter.active } : filter
      )
    );
  };

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
        keyExtractor={player => player.id.toString()}
        renderItem={({ item }) => (
          <PlayerCard
            player={item}
            edit={() => console.log(`Editing ${item.name} (id: ${item.id})`)}
            remove={() => removePlayer(item)}
          />
        )}
      />
    </>
  );
};

export default PlayersScreen;
