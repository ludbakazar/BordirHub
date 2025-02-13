import { handleCreateService } from "@/action";
import ErrorNotification from "@/components/errorNotif";
import Error from "next/error";

export default function Create() {
  return (
    <div className="h-screen flex flex-col items-center justify-start bg-gray-100">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 mt-10">
        <h1 className="text-white text-2xl font-bold mb-6 text-center">
          CREATE SERVICE
        </h1>
        <form action={handleCreateService} className="flex flex-col">
          <ErrorNotification />
          <br />
          <label htmlFor="serviceName" className="text-white font-bold mb-2">
            Service Name
          </label>

          <input
            type="text"
            id="serviceName"
            name="serviceName"
            placeholder="Enter service name"
            className="p-2 rounded-md border border-gray-300 focus:outline-none text-white "
            required
          />
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Create Service
          </button>
        </form>
      </div>
    </div>
  );
}
