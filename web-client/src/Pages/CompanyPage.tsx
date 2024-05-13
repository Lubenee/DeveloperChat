const CompanyPage = () => {
  // const [error, setError] = useState<string | null>(null);
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Name</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <p className="text-gray-600 mb-2">Industry: Ind</p>
              <p className="text-gray-600 mb-2">Location: SOfiq</p>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <p className="text-gray-600 mb-2">Contacts:</p>
              {/* <ul>
                {company?.contacts && (
                  <>
                    <li className="text-gray-600">
                      Email: {company?.contacts.website}
                    </li>
                    <li className="text-gray-600">
                      Phone: {company?.contacts.socials}
                    </li>
                  </>
                )}
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
