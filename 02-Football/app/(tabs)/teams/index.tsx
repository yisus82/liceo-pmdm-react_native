import TeamCard from "@/components/TeamCard";
import { initialTeams } from "@/db/teams";
import { Team } from "@/types/app";
import { useState } from "react";
import { Alert, FlatList } from "react-native";

const TeamsScreen = () => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);

  const removeTeam = (team: Team) => {
    Alert.alert("Remove team", `Are you sure you want to remove ${team.name}?`, [
      { text: "Cancel" },
      {
        text: "Remove", onPress: () => {
          setTeams(previousTeams => previousTeams.filter(t => t.id !== team.id));
        }
      },
    ]);
  };

  return (
    <FlatList
      data={teams}
      keyExtractor={team => team.id.toString()}
      renderItem={({ item }) => (
        <TeamCard
          team={item}
          edit={() => console.log(`Editing ${item.name} (id: ${item.id})`)}
          remove={() => removeTeam(item)}
        />
      )}
    />
  );
};

export default TeamsScreen;
