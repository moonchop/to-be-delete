import React, { useState } from "react";
import axios from "axios";

export const Fetch = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [headers, setHeaders] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleFetch = async () => {
    console.log(method);
    setResponse("");
    if (!url) {
      setError("URL을 입력하세요.");
      return;
    }

    try {
      const config = {
        method: method,
        url: url,
        headers: headers ? JSON.parse(headers) : null,
        data: body ? JSON.parse(body) : null,
      };

      const res = await axios(config);
      setResponse(JSON.stringify(res.data, null, 2));
      setError("");
    } catch (err) {
      console.log(err);
      setResponse("");
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">API Test Page</h2>
      <div className="mb-4">
        <label className="block mb-2">
          *Method:
          <select
            className="block w-full border p-2"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          *URL:
          <input
            type="text"
            className="block w-full border p-2"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Headers:
          <textarea
            className="block w-full border p-2"
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            placeholder='{
              "Authorization": "Bearer abcde"
            }'
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Body:
          <textarea
            className="block w-full border p-2 min-h-40"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='body에 담을 데이터가 있을 경우 작성&#13;&#13;
            {
              "name": "John Doe",
              "email": "john.doe@example.com",
              "message": "Hello, this is a test message."
            }'
          />
        </label>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleFetch}
      >
        Fetch
      </button>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Response:</h3>
        {response && <pre className="bg-gray-100 p-4">{response}</pre>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};
