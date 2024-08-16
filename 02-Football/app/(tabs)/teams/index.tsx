import TeamCard from "@/components/TeamCard";
import { Team } from "@/types/app";
import { useState } from "react";
import { Alert, FlatList } from "react-native";

const initialTeams: Team[] = [
  {
    id: 1,
    name: "Real Club Deportivo de La Coruña",
    location: {
      city: "A Coruña",
      country: "Spain",
    },
    stadium: {
      name: "Riazor",
      capacity: 32490,
    },
    logo: "https://logos-world.net/wp-content/uploads/2020/11/Deportivo-La-Coruna-Logo.png",
  },
  {
    id: 2,
    name: "Real Madrid Club de Fútbol",
    location: {
      city: "Madrid",
      country: "Spain",
    },
    stadium: {
      name: "Santiago Bernabéu",
      capacity: 85000,
    },
    logo: "https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png",
  },
  {
    id: 3,
    name: "Futbol Club Barcelona",
    location: {
      city: "Barcelona",
      country: "Spain",
    },
    stadium: {
      name: "Camp Nou",
      capacity: 99354,
    },
    logo: "https://logos-world.net/wp-content/uploads/2020/04/Barcelona-Logo.png",
  },
  {
    id: 4,
    name: "Manchester City Football Club",
    location: {
      city: "Manchester",
      country: "England",
    },
    stadium: {
      name: "Etihad",
      capacity: 53400,
    },
    logo: "https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png",
  },
  {
    id: 5,
    name: "FC Bayern München",
    location: {
      city: "Munich",
      country: "Germany",
    },
    stadium: {
      name: "Allianz Arena",
      capacity: 75024,
    },
    logo: "https://logos-world.net/wp-content/uploads/2020/06/FC-Bayern-Munchen-Logo.png",
  },
  {
    id: 6,
    name: "Paris Saint-Germain Football Club",
    location: {
      city: "Paris",
      country: "France",
    },
    stadium: {
      name: "Parc des Princes",
      capacity: 48583,
    },
    logo: "https://logos-world.net/wp-content/uploads/2020/07/PSG-Logo.png",
  },
];

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
