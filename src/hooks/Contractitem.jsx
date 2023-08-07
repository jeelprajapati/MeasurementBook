import React from "react";
import useFetch from "./useFetch";

const Contractitem = ({
  projectId,
  setContractItemId,
  table,
  contractItemId,
}) => {
  const { loding, error, data } = useFetch({
    url: `/ContractItem/GetByProjectId?projectId=${projectId}&page=${1}&pageSize=${100}`,
    change: 0,
  });
  const handleChange = (e) => {
    setContractItemId(e.target.value);
  };
  return (
    <>
      {table ? (
        data?.items
          .filter((item) => item.id === contractItemId)
          ?.map((e) => <span>{e?.item}</span>)
      ) : (
        <select
          name="contractId"
          value={contractItemId ? contractItemId : ""}
          id=""
          onChange={handleChange}
          className="measure-select"
        >
          <option>select</option>
          {!loding &&
            data?.items.map((e) => <option value={e?.id}>{e?.item}</option>)}
        </select>
      )}
    </>
  );
};

export default Contractitem;
