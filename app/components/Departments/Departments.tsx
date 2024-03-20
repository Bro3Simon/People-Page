import { List, ListSubheader } from "@mui/material";

import { ActiveDepartments } from "app/components/ClientContainer/ClientContainer";
import { Department } from "app/components/Department";
import { DepartmentRecord } from "app/page";

type PropsOfDepartments = {
  activeDepartments: ActiveDepartments;
  areChildren?: boolean;
  departments: DepartmentRecord[];
  onChangeDepartmentFilter: (departmentName: string) => void;
};

export function Departments({
  activeDepartments,
  areChildren = false,
  departments,
  onChangeDepartmentFilter: handleChangeDepartmentFilter,
}: PropsOfDepartments) {
  return (
    <List
      {...(areChildren && { disablePadding: true })}
      {...(!areChildren && {
        "aria-labelledby": "nested-list-subheader",
        subheader: (
          <ListSubheader component="div" id="nested-list-subheader">
            Filter By Department
          </ListSubheader>
        ),
      })}
    >
      {departments.map((department: DepartmentRecord) => (
        <Department
          activeDepartments={activeDepartments}
          department={department}
          isChild={areChildren}
          key={department.id}
          onChangeDepartmentFilter={handleChangeDepartmentFilter}
        />
      ))}
    </List>
  );
}
