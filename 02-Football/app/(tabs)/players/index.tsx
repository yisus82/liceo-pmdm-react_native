import PlayerCard from "@/components/PlayerCard";
import { initialPlayers } from "@/db/players";
import { Player } from "@/types/app";
import { useState } from "react";
import { Alert, FlatList } from "react-native";

const PlayersScreen = () => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

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
    <FlatList
      data={players}
      keyExtractor={player => player.id.toString()}
      renderItem={({ item }) => (
        <PlayerCard
          player={item}
          edit={() => console.log(`Editing ${item.name} (id: ${item.id})`)}
          remove={() => removePlayer(item)}
        />
      )}
    />
  );
};

export default PlayersScreen;
