import { List, Typography } from "@mui/material";

import { Person } from "app/components/Person";
import { PersonRecord } from "app/page";

type PeopleProps = {
  filteredPeople: PersonRecord[];
};

export function People({ filteredPeople }: PeopleProps) {
  const hasPeople = !!filteredPeople.length;

  if (!hasPeople) {
    return <Typography component="h3" variant="h6"></Typography>;
  }

  return (
    <List
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: { md: "start", xs: "center" },
        ml: { md: 8, xs: 0 },
      }}
    >
      {filteredPeople.map((person: PersonRecord, index: number) => (
        <Person index={index} key={person.id} person={person} />
      ))}
    </List>
  );
}
