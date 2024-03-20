import { Card, CardContent, ListItem, Typography } from "@mui/material";
import Image from "next/image";

import { PersonRecord } from "app/page";

import placeholderAvatar from "./placeholder-avatar.jpg";

type PersonProps = {
  person: PersonRecord;
  index: number;
};

export function Person({
  person: { avatar: avatarProp, name, title, department },
  index,
}: PersonProps) {
  const avatar = avatarProp?.url || placeholderAvatar;

  return (
    <ListItem sx={{ width: "290px" }}>
      <Card sx={{ width: "100%" }}>
        <CardContent
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Image
            alt={`${name}'s avatar`}
            height={110}
            priority={index < 13}
            src={avatar}
            style={{ borderRadius: "50%" }}
            width={105}
          />

          <Typography component="h3" fontWeight="bold" variant="body2">
            {name}
          </Typography>

          <Typography component="h3" variant="body2">
            {title}
          </Typography>

          <Typography component="h3" variant="body2">
            {department.name}
          </Typography>
        </CardContent>
      </Card>
    </ListItem>
  );
}
