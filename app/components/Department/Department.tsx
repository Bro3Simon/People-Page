import { useState } from "react";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Box,
  Collapse,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { ActiveDepartments } from "app/components/ClientContainer/ClientContainer";
import { Departments } from "app/components/Departments";
import { DepartmentRecord } from "app/page";

type DepartmentProps = {
  activeDepartments: ActiveDepartments;
  department: DepartmentRecord;
  isChild?: boolean;
  onChangeDepartmentFilter: (departmentName: string) => void;
};
export function Department({
  activeDepartments,
  department: { name, children },
  isChild = false,
  onChangeDepartmentFilter: handleChangeDepartmentFilter,
}: DepartmentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = activeDepartments.includes(name);
  const hasChildren = !!children?.length;

  function handleClickDepartment() {
    handleChangeDepartmentFilter(name.toLowerCase());
  }

  function handleToggleExpansion() {
    setIsExpanded((previousIsExpanded: boolean) => !previousIsExpanded);
  }

  return (
    <ListItem
      sx={{
        alignItems: "start",
        flexDirection: "column",
        ...(isChild && { ml: 4 }),
      }}
    >
      <Box display="flex">
        {hasChildren ? (
          <ListItemButton
            aria-label={isExpanded ? "Collapse" : "Expand"}
            onClick={handleToggleExpansion}
          >
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        ) : null}

        <ListItemButton
          onClick={handleClickDepartment}
          selected={isActive}
          {...(!hasChildren && { sx: { ml: 7 } })}
        >
          <ListItemText primary={name} />
        </ListItemButton>
      </Box>

      {hasChildren ? (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Departments
            activeDepartments={activeDepartments}
            areChildren
            departments={children}
            onChangeDepartmentFilter={handleChangeDepartmentFilter}
          />
        </Collapse>
      ) : null}
    </ListItem>
  );
}
