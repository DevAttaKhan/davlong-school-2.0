export const DoubleCheckAddressesBox = () => {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600">
        <span className="text-xs font-bold text-white">i</span>
      </div>
      <div className="min-w-0">
        <p className="mb-1 font-bold text-gray-900">
          Make sure to double-check the addresses
        </p>
        <div className="text-sm text-gray-700">
          To provide an accurate quotation, we require the exact address for each
          location you are travelling to. For example, instead of entering{" "}
          <span className="font-medium text-blue-600">
            &quot;Skibbereen, Co. Cork&quot;
          </span>
          , please provide the full address such as{" "}
          <span className="font-medium text-blue-600">
            &quot;West Cork Hotel, Ilen St, Skibbereen, Co. Cork&quot;
          </span>
          , or even better if you use the{" "}
          <span className="font-medium text-blue-600">Eircode</span> (e.g.,{" "}
          <span className="font-medium text-blue-600">P81 FH63</span>).
        </div>
      </div>
    </div>
  );
};
