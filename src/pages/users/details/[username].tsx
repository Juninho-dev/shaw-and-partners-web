import axios from "axios";
import { useRouter } from "next/router";
import { Layout } from "../../../components/Layout";
import { getAPIClient } from "../../../services/axios";

interface UserDetailsProps {
  user: {
    id: number;
    login: string;
    html_url: string;
    avatar_url: string;
    created_at: string;
  };
  repos: {
    id: number;
    name: string;
    url: string;
  }[];
}

export default function UserDetails({ user, repos }: UserDetailsProps) {
  const router = useRouter();
  console.log(user)
  return (
    <Layout title="User Details">
      <div className="flex justify-center text-center mt-5">
        <div className="grid grid-cols-1 gap-5 bg-white rounded shadow-lg max-w-5xl px-16 py-8 w-full">
          <div>
            <button
              className="flex justify-start text-lg"
              onClick={() => router.back()}
            >
              ⬅
            </button>
            <h1 className="text-4xl font-bold">{user.login}</h1>
            <div className="flex justify-center">
              <img
                src={user.avatar_url}
                alt="UserAvatar"
                className="w-32 rounded-full text-center"
              />
            </div>
            <div>
              <p className="text-lg font-bold">Profile URL:</p>
              <a href={user.html_url} className="text-blue-500 hover:underline">
                {user.html_url}
              </a>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold mt-5">Repositories</h1>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="border-b">
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>URL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {repos.map((repo) => (
                          <tr key={repo.id} className="border-b">
                            <td className="px-6 py-4">{repo.id}</td>
                            <td className="px-6 py-4">{repo.name}</td>
                            <td className="px-6 py-4">
                              <a
                                href={repo.url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-blue-500 hover:underline"
                              >
                                {repo.url}
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.query;
  const api = getAPIClient(context);

  const [responseDetails, responseRepos] = await axios.all([
    api.get(`/users/${username}/details`),
    api.get(`/users/${username}/repos`),
  ]);

  return {
    props: {
      user: responseDetails.data.payload,
      repos: responseRepos.data.payload,
    },
  };
}
