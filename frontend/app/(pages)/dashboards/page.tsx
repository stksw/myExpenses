"use client";

import { Container, Table, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { DashboardsApi } from "@/apis/dashboards/api_functions";

const DashboardsPage = () => {

  const { data: res } = useQuery({
    queryKey: ["dashboards", "list"],
    queryFn: () => DashboardsApi.list(),
  });

  return (
    <Container size="4">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>日時</Table.ColumnHeaderCell> 
            <Table.ColumnHeaderCell>金融機関</Table.ColumnHeaderCell> 
            <Table.ColumnHeaderCell>残高</Table.ColumnHeaderCell> 
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {res?.data && res.data.map((history) => (
            <Table.Row key={history.id}>
              <Table.Cell><Text style={{"fontFamily": "sans-serif"}}>{String(history.recorded_at)}</Text></Table.Cell>
              <Table.Cell>{history.bank_account}</Table.Cell>
              <Table.Cell align="right"><Text style={{"fontFamily": "sans-serif"}}>¥{Number(history.balance).toLocaleString()}</Text></Table.Cell>
            </Table.Row>
          ))}
          
        </Table.Body>
      </Table.Root>
    </Container>
  )
};

export default DashboardsPage;
