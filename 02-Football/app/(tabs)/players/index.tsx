import FilterBadge from "@/components/FilterBadge";
import PlayerCard from "@/components/PlayerCard";
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

  const toggleFilter = (position: PlayerPosition) => {
    setFilters(previousFilters =>
      previousFilters.map(filter =>
        filter.value === position ? { ...filter, active: !filter.active } : filter
      )
    );
  };

  useEffect(() => {
    if (filters.every(filter => !filter.active)) {
      setFilteredPlayers(players);
      return;
    }

    setFilteredPlayers(players.filter(player => filters.find(filter => filter.active && filter.value === player.position)));
  }, [players, filters]);

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
