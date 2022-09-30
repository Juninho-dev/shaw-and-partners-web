import { useRouter } from "next/router";

export default function UserDetails() {
  const {
    query: { username },
  } = useRouter();
  console.log(username);
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">User Details</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.query;

  // TO DO: Get user details from API
  console.log(username);

  return {
    props: {},
  };
}
