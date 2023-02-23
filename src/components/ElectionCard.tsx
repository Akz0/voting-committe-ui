import { GoCircleSlash, GoPencil } from "react-icons/go";

const ElectionCard = ({
  name,
  active,
  status,
  _id,
  img,
  EditHandler,
  DeleteHandler,
  Deactivate,
}: any) => {
  return (
    <div className="election-card">
      <figure>
        <img src={img} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name}
          <div className={`badge badge-${active ? "success" : "error"}`}>
            {active ? "Active" : "Not Active"}
          </div>
        </h2>
        <p></p>
        <div className="card-actions display flex justify-between items-center">
          <div className="badge badge-outline">{status}</div>

          <div className="icons flex space-x-4">
            <button
              className="btn btn-outline btn-warning btn-sm"
              onClick={EditHandler}
            >
              <GoPencil />
            </button>

            {/* <button
              className="btn btn-outline btn-error btn-sm"
              onClick={DeleteHandler}
            >
              <GoTrashcan />
            </button> */}

            {(status !== "cancelled" || status !== "completed") && !active ? (
              ""
            ) : (
              <button
                className="btn btn-outline btn-error btn-sm"
                onClick={Deactivate}
              >
                <GoCircleSlash />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionCard;
