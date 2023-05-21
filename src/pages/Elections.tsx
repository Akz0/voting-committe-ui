import moment from "moment";
import { useEffect, useState } from "react";
import { Modal, Select } from "react-daisyui";
import { GoPlus, GoX } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import ElectionCard from "../components/ElectionCard";
import Loader from "../components/Loader";
import {
  CreateNewElection,
  DeactivateElection,
  GetAllElections,
  UpdateElection,
} from "../store/actions/electionActions";
import { GetAllLocations } from "../store/actions/locationActions";
import { IElection } from "../store/reducers/electionSlice";

const Elections = () => {
  const [deleteModal, SetDeleteModal] = useState(false);
  const [updateModal, SetUpdateModal] = useState(false);
  const [newModal, SetNewModal] = useState(false);
  const dispatch: any = useDispatch();
  const { loading, message, elections } = useSelector(
    (state: any) => state?.election
  );
  //Main locations List
  const locationList = useSelector((state: any) => state?.location?.locations);

  //Local Data
  const [name, setName] = useState("");
  const [locations, setLocations] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [status, setStatus] = useState<string>("scheduled");
  const [nominationDeadline, setNominationDeadline] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [pollingStart, setPollingStart] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [pollingEnd, setPollingEnd] = useState(moment().format("YYYY-MM-DD"));
  const [resultDate, setResultDate] = useState(moment().format("YYYY-MM-DD"));

  const [newLocation, setNewLocation] = useState<string>(locationList[0]?._id);
  const [currentElection, SetCurrentElection] = useState<IElection>({
    name: "",
    locations: [],
    active: false,
    status: "scheduled",
    imageURL: null,
    _id: "",
  });

  useEffect(() => {
    Get();
    dispatch(GetAllLocations(() => {}));
  }, []);

  const Delete = (_id: string) => {
    dispatch(
      DeactivateElection(_id, () => {
        SetDeleteModal(false);
        Get();
      })
    );
  };

  const resetLocalData = () => {
    setName("");
    setLocations([]);
    SetCurrentElection({
      name: "",
      locations: [],
      active: false,
      status: "scheduled",
      imageURL: null,
      _id: "",
    });
  };

  const Add = () => {
    if (name === "" || !locations) {
      alert("Please complete the fields!");
      return;
    }
    const newElection = {
      name: name,
      locations: locations.map((location: any) => {
        return { locationId: location._id };
      }),
      status: status,
      pollingEnd,
      pollingStart,
      nominationDeadline,
      resultDate,
    };

    console.log(newElection);
    dispatch(
      CreateNewElection({ ...newElection }, () => {
        SetNewModal(false);
        Get();
        resetLocalData();
      })
    );
  };

  const Update = () => {
    if (currentElection?.name === "") {
      alert("Please Complete the fields.");
      return;
    }
    dispatch(
      UpdateElection(
        { ...currentElection, status },
        currentElection?._id,
        () => {
          SetUpdateModal(false);
          Get();
          resetLocalData();
        }
      )
    );
  };

  const Get = () => {
    dispatch(GetAllElections(() => {}));
  };

  const AddNewLocationToLocations = () => {
    const exists = locations.findIndex((item: any) => item._id === newLocation);
    if (exists !== -1) {
      return;
    }
    const location = locationList.find((item: any) => {
      return newLocation === item._id;
    });

    const locationId = {
      name: location?.name,
      _id: location?._id,
    };

    const newLocations = [...locations];
    newLocations.push(locationId);
    setLocations(newLocations);
  };

  const RemoveLocationFromLocations = (id: string) => {
    const newLocations = [...locations];
    const index = newLocations.findIndex((item: any) => {
      return item._id === id;
    });
    if (index !== -1) {
      newLocations.splice(index, 1);
      setLocations(newLocations);
      console.log(newLocations);
    }
  };

  const AddNewLocationToCurrentElection = () => {
    const exists = currentElection?.locations?.findIndex(
      (item: any) => item.locationId?._id === newLocation
    );
    if (exists !== -1) {
      return;
    }
    const location = locationList.find((item: any) => {
      return newLocation === item._id;
    });

    const locationId = {
      locationId: {
        name: location?.name,
        _id: location?._id,
      },
      pollingStart: null,
      pollingEnd: null,
    };

    const newLocations = [...currentElection?.locations];
    newLocations.push(locationId);
    console.log(newLocations);
    SetCurrentElection((prevState) => {
      return {
        ...prevState,
        locations: newLocations,
      };
    });
  };

  const RemoveLocationFromCurrentElection = (id: string) => {
    const newLocations = [...currentElection?.locations];
    const index = newLocations.findIndex((item: any) => {
      return item.locationId?._id === id;
    });
    if (index !== -1) {
      newLocations.splice(index, 1);
      SetCurrentElection((prevState) => {
        return {
          ...prevState,
          locations: newLocations,
        };
      });
    }
  };

  const DeleteModal = () => {
    return (
      <Modal
        id="delete"
        open={deleteModal}
        onClickBackdrop={() => SetDeleteModal(false)}
      >
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div>
              Are you sure you want to deactivate election{" "}
              <span className="font-bold text-primary">{`${currentElection?.name}`}</span>{" "}
              ?
            </div>
            <div className="flex space-x-4">
              <button
                className="modal-action btn hover:border-red-500 bg-red-400 text-white border-red-400 hover:bg-red-500 "
                onClick={() => Delete(currentElection?._id || "")}
              >
                Deactivate
              </button>

              <button
                className="modal-action btn btn-ghost "
                onClick={() => SetDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    );
  };

  const UpdateModal = () => {
    return (
      <Modal
        id="update"
        open={updateModal}
        onClickBackdrop={() => SetUpdateModal(false)}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold py-3">Edit Election</h1>
            <div className="w-full">
              <div className="flex space-x-4">
                <div className="form-control w-full max-w-xs bo">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={currentElection?.name}
                    onChange={(e) =>
                      SetCurrentElection((prevState) => {
                        return { ...prevState, name: e.target.value };
                      })
                    }
                    required
                  />
                  <label className="label"></label>
                </div>

                <div className="form-control w-full max-w-xs bo">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <Select
                    placeholder="Type here"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value={"completed"}>Completed</option>
                    <option value={"active"}>Active</option>
                    <option value={"cancelled"}>Cancelled</option>
                    <option value={"scheduled"}>Scheduled</option>
                  </Select>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Nomination Deadline</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={nominationDeadline}
                    onChange={(e) => {
                      const newDate = moment(new Date(e.target.value)).format(
                        "YYYY-MM-DD"
                      );
                      setNominationDeadline(newDate);
                    }}
                    required
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Polling Start</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={pollingStart}
                    onChange={(e) => {
                      const newDate = moment(new Date(e.target.value)).format(
                        "YYYY-MM-DD"
                      );
                      setPollingStart(newDate);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">End Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full max-w-xs"
                    value={pollingEnd}
                    onChange={(e) => {
                      const newDate = moment(new Date(e.target.value)).format(
                        "YYYY-MM-DD"
                      );
                      setPollingEnd(newDate);
                    }}
                    required
                  />
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Result Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full max-w-xs"
                    value={resultDate}
                    onChange={(e) => {
                      const newDate = moment(new Date(e.target.value)).format(
                        "YYYY-MM-DD"
                      );
                      setResultDate(newDate);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Locations</span>
                </label>
                <div className="flex space-x-4">
                  <Select
                    value={newLocation}
                    onChange={(e) => {
                      setNewLocation(e.target.value);
                    }}
                    className="select w-full"
                  >
                    {locationList?.map((location: any) => {
                      return (
                        <option key={location._id} value={location._id}>
                          {location.name}
                        </option>
                      );
                    })}
                  </Select>
                  <button
                    className="btn  btn-outline btn-primary"
                    onClick={AddNewLocationToCurrentElection}
                  >
                    Add
                  </button>
                </div>
                <div>
                  <ul className="locations-list">
                    {currentElection.locations &&
                      currentElection.locations?.map((location) => {
                        return (
                          <li
                            key={location?.locationId?._id}
                            className="rounded-md border-b flex justify-between items-center p-2"
                          >
                            <span>{location?.locationId?.name}</span>
                            <span
                              className="icons btn btn-error btn-sm btn-outline"
                              onClick={() =>
                                RemoveLocationFromCurrentElection(
                                  location?.locationId?._id
                                )
                              }
                            >
                              <GoX />
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                className="modal-action btn hover:border-green-500 bg-green-400 text-white border-green-400 hover:bg-green-500 "
                onClick={Update}
              >
                Save
              </button>

              <button
                className="modal-action btn btn-ghost "
                onClick={() => SetUpdateModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    );
  };

  const NewModal = () => {
    return (
      <Modal
        id="new"
        open={newModal}
        onClickBackdrop={() => SetNewModal(false)}
        className=""
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full">
            <h1 className="text-2xl font-bold py-3">Create New Election</h1>
            <div className="w-full">
              <div className="flex space-x-4">
                <div className="form-control w-full max-w-xs bo">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control w-full max-w-xs bo">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <Select
                    placeholder="Type here"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value={"completed"}>Completed</option>
                    <option value={"active"}>Active</option>
                    <option value={"cancelled"}>Cancelled</option>
                    <option value={"scheduled"}>Scheduled</option>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Nomination Deadline</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={nominationDeadline}
                    onChange={(e) => {
                      const newDate = moment(new Date(e.target.value)).format(
                        "YYYY-MM-DD"
                      );
                      setNominationDeadline(newDate);
                    }}
                    required
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Polling Start</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={pollingStart}
                    onChange={(e) => {
                      const newDate = moment(new Date(e.target.value)).format(
                        "YYYY-MM-DD"
                      );
                      setPollingStart(newDate);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">End Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full max-w-xs"
                    value={pollingEnd}
                    onChange={(e) => {
                      const newDate = moment(new Date(e.target.value)).format(
                        "YYYY-MM-DD"
                      );
                      setPollingEnd(newDate);
                    }}
                    required
                  />
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Result Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full max-w-xs"
                    value={resultDate}
                    onChange={(e) => {
                      const newDate = moment(new Date(e.target.value)).format(
                        "YYYY-MM-DD"
                      );
                      setResultDate(newDate);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Locations</span>
                </label>
                <div className="flex space-x-4">
                  <Select
                    value={newLocation}
                    onChange={(e) => {
                      setNewLocation(e.target.value);
                    }}
                    className="select w-full"
                  >
                    {locationList?.map((location: any) => {
                      return (
                        <option key={location._id} value={location._id}>
                          {location.name}
                        </option>
                      );
                    })}
                  </Select>
                  <button
                    className="btn  btn-outline btn-primary"
                    onClick={AddNewLocationToLocations}
                  >
                    Add
                  </button>
                </div>
                <div>
                  <ul className="locations-list">
                    {locations &&
                      locations?.map((location: any) => {
                        return (
                          <li
                            key={location?._id}
                            className="rounded-md border-b flex justify-between items-center p-2"
                          >
                            <span>{location?.name}</span>
                            <span
                              className="icons btn btn-error btn-sm btn-outline"
                              onClick={() =>
                                RemoveLocationFromLocations(location._id)
                              }
                            >
                              <GoX />
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                className="modal-action btn hover:border-green-500 bg-green-400 text-white border-green-400 hover:bg-green-500 "
                onClick={Add}
              >
                Save
              </button>

              <button
                className="modal-action btn btn-ghost "
                onClick={() => SetNewModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    );
  };

  const SearchLocations = (location: string) => {};

  const RenderCards = () => {
    return (
      <div className="election-card-container">
        {elections?.map((election: any) => (
          <ElectionCard
            name={election.name}
            active={election.active}
            status={election.status}
            _id={election._id}
            img={""}
            EditHandler={() => {
              SetCurrentElection(election);
              setPollingEnd(
                moment(new Date(election?.pollingEnd)).format("YYYY-MM-DD")
              );
              setResultDate(
                moment(new Date(election?.resultDate)).format("YYYY-MM-DD")
              );
              setPollingStart(
                moment(new Date(election?.pollingStart)).format("YYYY-MM-DD")
              );
              setNominationDeadline(
                moment(new Date(election?.nominationDeadline)).format(
                  "YYYY-MM-DD"
                )
              );
              SetUpdateModal(true);
            }}
            DeleteHandler={() => {
              SetCurrentElection(election);
              SetDeleteModal(true);
            }}
            Deactivate={() => {
              SetCurrentElection(election);
              SetDeleteModal(true);
            }}
            key={election._id}
          />
        ))}
      </div>
    );
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="page-header-bar">
        <p className="text-2xl capitalize font-bold">Elections</p>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => SearchLocations(e.target.value)}
          className="input w-[50%]"
        />
        <button
          className="btn btn-outline btn-primary flex space-x-4"
          onClick={() => {
            setNewLocation(locationList[0]._id);
            setLocations([]);
            SetNewModal(true);
          }}
        >
          <GoPlus />
          <span>Add New Election</span>
        </button>
      </div>
      <div className="flex justify-start overflow-auto">{RenderCards()}</div>
      {DeleteModal()}
      {UpdateModal()}
      {NewModal()}
    </div>
  );
};

export default Elections;
