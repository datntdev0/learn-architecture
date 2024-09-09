import { Table } from "flowbite-react/components/Table";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { UserGet } from "../../models/UserGet";

export default function UserList() {

  const { getAccessToken } = useAuth();

  const [users, setUsers] = useState<UserGet[] | undefined>(undefined);

  useEffect(() => {
    async function fetchUserList(): Promise<void> {
      try {
        const response = await fetch("https://localhost:7216/Users", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
          }
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
        setUsers([]);
      }
    }

    if (!users) fetchUserList();
  }, [getAccessToken, users]);

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Object Id</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Full Name</Table.HeadCell>
            <Table.HeadCell>Enabled</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users?.map(x => (
              <Table.Row key={x.objectId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {x.objectId}
                </Table.Cell>
                <Table.Cell>{x.username}</Table.Cell>
                <Table.Cell>{(!x.firstName || !x.lastName) ? x.displayName : `${x.firstName} ${x.lastName}`}</Table.Cell>
                <Table.Cell>{x.isEnabled?.toString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  )
}