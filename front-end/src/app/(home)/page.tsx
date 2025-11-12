import UserManagement from "@/components/user-management";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[8vh] 2xl:py-48">
        <div className="max-w-3xl mx-auto w-full">
          <Suspense fallback={<p>Loading...</p>}>
            <UserManagement />
          </Suspense>
        </div>
      </section>
    </div>
  );
}