import React from "react";
import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import Login from "../views/Login/Login.view";
import { Route, Switch } from "react-router-dom";
import OverAllFeedbackForm from "../views/FeedbackForm/OverAllFeedbackForm.js";
import PositiveCustomerFeedback from "../views/FeedbackForm/PositiveCustomerFeedback.js";
import NegativeFeedback from "../views/FeedbackForm/NegativeFeedback.js";
import CompletionScreen from "../views/FeedbackForm/CompletionScreen.js";
import Invoice from "../views/FeedbackForm/Invoice/Invoice.js";
import DownloadInvoice from "../views/FeedbackForm/Invoice/DownloadInvoice.js";



const RouteComponent = () => (
  <Switch>
    <Route path={"/login"} component={Login} />
    <Route path={`/download/invoice`} component={DownloadInvoice} />
    <Route path={"/feedback/positive"} component={PositiveCustomerFeedback} />
    <Route path={"/feedback/negative"} component={NegativeFeedback} />
    <Route path={"/feedback/submit"} component={CompletionScreen} />
    <Route path={"/feedback"} component={OverAllFeedbackForm} />
    <Route path={"/invoice"} component={Invoice} />
    <Route path={"/"} component={Dashboard} />
    {/* <Route path={RouteName.NEGATIVE_FEEDBACK_FORM} component={NegativeFeedback}/> */}
  </Switch>
);
export default RouteComponent;
