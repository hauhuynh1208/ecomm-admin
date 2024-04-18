import { redirect } from "next/navigation";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          redirect("/login");
        }}
      >
        <button>Go to login</button>
      </form>
      <p>Root Page</p>
    </div>
  );
}
