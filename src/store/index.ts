import { VoterReducer } from "./reducers/voterSlice";
import { CandidateReducer } from "./reducers/candidateSlice";
import { ElectionReducer } from "./reducers/electionSlice";
import { LocationReducer } from "./reducers/locationSlice";
import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./reducers/authSlice";

const Store = configureStore({
  reducer: {
    auth: AuthReducer,
    location: LocationReducer,
    election: ElectionReducer,
    candidate: CandidateReducer,
    voter: VoterReducer,
  },
});

export default Store;
