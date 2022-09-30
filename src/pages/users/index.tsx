import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "../../components/Button";
import { CardUser } from "../../components/CardUser";
import { Layout } from "../../components/Layout";
import { IUser } from "../../interfaces/IUser";
import { getAPIClient } from "../../services/axios";

export default function Users({ users }: { users: IUser[] }) {
  const [page, setPage] = useState(0);
  const router = useRouter();

  const nextPage = () => {
    setPage(page + 1);
    router.push(`/users?page=${page + 1}`);
  };
  const previousPage = () => {
    setPage(page - 1);

    if (page !== 1) {
      router.push(`/users?page=${page - 1}`);
    } else {
      router.push(`/users`);
    }
  };

  return (
    <Layout title="Users">
      <div className="p-10">
        <div className="grid items-center grid-cols-2 gap-4">
          {users.map((user) => (
            <CardUser key={user.id} user={user} />
          ))}
          {page > 0 ? (
            <div className="flex justify-start">
              <Button
                className="bg-blue-500 hover:brightness-90 px-4 py-2 rounded shadow text-white"
                onClick={previousPage}
              >
                Previous page
              </Button>
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex justify-end">
            <Button onClick={nextPage}>Next Page</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const api = getAPIClient(context);
  const { page } = context.query;

  const users = await api.get("/users", {
    params: {
      since: page ? page * 30 : 0,
    },
  });

  return {
    props: {
      users: users.data.payload,
    },
  };
}
