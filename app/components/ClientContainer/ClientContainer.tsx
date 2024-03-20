"use client";

import { ChangeEvent, useCallback, useMemo, useState } from "react";

import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";

import { Departments } from "app/components/Departments";
import { People } from "app/components/People";
import { DepartmentRecord, PageData, PersonRecord } from "app/page";

export type ActiveDepartments = string[];
type ClientContainerProps = PageData["data"] & {
  departmentTree: DepartmentRecord[];
};

export function ClientContainer({
  allDepartments,
  allPeople,
  departmentTree,
}: ClientContainerProps) {
  const [nameFilter, setNameFilter] = useState("");
  const [
    shouldFilterPeopleMissingAnImage,
    setShouldFilterPeopleMissingAnImage,
  ] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState("");

  const filteredPeople = allPeople.filter((person: PersonRecord) => {
    const doesMatchDepartmentFilter =
      !departmentFilter ||
      departmentFilter === person.department?.name?.toLocaleLowerCase();
    const doesMatchNameFilter =
      !nameFilter || person.name?.toLocaleLowerCase().includes(nameFilter);
    const doesMatchImageFilter =
      !shouldFilterPeopleMissingAnImage || person.avatar;

    return (
      doesMatchDepartmentFilter && doesMatchNameFilter && doesMatchImageFilter
    );
  });

  const computeActiveDepartments = useCallback(
    (name: string): ActiveDepartments => {
      if (!name.length) {
        return [];
      }

      const foundDepartment = findDepartmentByName(allDepartments, name);

      if (foundDepartment) {
        const activeDepartments: ActiveDepartments = [foundDepartment.name];

        let currentDepartment = foundDepartment;

        while (currentDepartment.parent) {
          const parentId = currentDepartment.parent.id;
          const parentDepartment = findDepartmentByParentId(
            allDepartments,
            parentId
          );

          if (!parentDepartment) {
            break;
          }

          activeDepartments.unshift(parentDepartment.name);
          currentDepartment = parentDepartment;
        }

        return activeDepartments;
      }

      return [];
    },
    [allDepartments]
  );

  function findDepartmentByName(departments: DepartmentRecord[], name: string) {
    return departments.find(
      (department: DepartmentRecord) =>
        department.name.toLowerCase() === name.toLowerCase()
    );
  }

  function findDepartmentByParentId(
    departments: DepartmentRecord[],
    parentId: string
  ) {
    return departments.find(
      (department: DepartmentRecord) => department.id === parentId
    );
  }

  const activeDepartments = useMemo(
    () => computeActiveDepartments(departmentFilter),
    [computeActiveDepartments, departmentFilter]
  );

  function handleChangeNameFilter({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) {
    setNameFilter(value.toLowerCase());
  }

  function handleChangeHidePeopleMissingAnImage({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) {
    setShouldFilterPeopleMissingAnImage(checked);
  }

  function handleChangeDepartmentFilter(departmentName: string) {
    setDepartmentFilter((previousDepartmentFilter: string) =>
      previousDepartmentFilter === departmentName ? "" : departmentName
    );
  }

  return (
    <>
      <TextField
        margin="normal"
        onChange={handleChangeNameFilter}
        placeholder="Search people by name"
        type="search"
        value={nameFilter}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={shouldFilterPeopleMissingAnImage}
            onChange={handleChangeHidePeopleMissingAnImage}
          />
        }
        label="Hide people missing a profile image"
      />

      <Box
        alignItems="flex-start"
        display="flex"
        mb={8}
        width={{ md: "100%", xs: "auto" }}
      >
        <Box component="aside" display={{ md: "block", xs: "none" }}>
          <Departments
            activeDepartments={activeDepartments}
            departments={departmentTree}
            onChangeDepartmentFilter={handleChangeDepartmentFilter}
          />
        </Box>

        <People filteredPeople={filteredPeople} />
      </Box>
    </>
  );
}
