import FormControl from "#c/FormControl";

export const metadata = {
  title: "DNS | Dnsrpm",
};

var page = ({ searchParams }) => {
  return (
    <>
      <h1>DNS Page</h1>
      <FormControl state={searchParams} table="dns" />
    </>
  );
};

export default page;
