import { Container, Typography } from "@mui/material";

import { ClientContainer } from "app/components/ClientContainer";
import { PAGE_CONTENT_QUERY } from "app/services";

import { performRequest } from "./datocms";

export type PageData = {
  data: {
    allPeople: PersonRecord[];
    allDepartments: DepartmentRecord[];
  };
};
export type DepartmentRecord = {
  id: string;
  name: string;
  children?: DepartmentRecord[];
  parent?: Pick<DepartmentRecord, "id">;
};
export type PersonRecord = {
  id: string;
  name: string;
  title: string;
  avatar?: {
    url: string;
  };
  department: DepartmentRecord;
};

export default async function Home() {
  const {
    data: { allDepartments, allPeople },
  }: PageData = await performRequest({
    query: PAGE_CONTENT_QUERY,
  });

  const departmentTree = buildDepartmentTree(allDepartments);

  function buildDepartmentTree(
    departments: DepartmentRecord[],
    parentId: string | null = null
  ) {
    const departmentTree: DepartmentRecord[] = [];

    for (const { id, name, parent } of departments) {
      const hasParent = !!parent;
      const isRecursiveCall = !!parentId;
      const doesParentIdMatch = parent?.id === parentId;
      const shouldIncludeDepartmentOnThisLevel =
        (hasParent && doesParentIdMatch) || (!hasParent && !isRecursiveCall);

      if (shouldIncludeDepartmentOnThisLevel) {
        const department: DepartmentRecord = {
          children: buildDepartmentTree(departments, id),
          id,
          name,
          ...(parentId && { parent: { id: parentId } }),
        };

        departmentTree.push(department);
      }
    }

    return departmentTree;
  }

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" my={8} variant="h2">
        Our Team
      </Typography>

      <Typography component="h2" mb={2} variant="h5">
        Find a Team Member
      </Typography>

      <ClientContainer
        allDepartments={allDepartments}
        allPeople={allPeople}
        departmentTree={departmentTree}
      />
    </Container>
  );
}
