export const capitalizeFirstLetter = (str) => {
  if (str[0] === str[0].toUpperCase()) {
    // First letter is already capitalized, return as is
    return str;
  } else {
    // Capitalize the first letter
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

export const getGetterTextColor = (title) => {
  switch (title) {
    case "ABSENT":
      return "#FF493F";
    case "PRESENT":
      return "#0E9717";

    case "HALF_DAY":
      return "#7848CB";
    case "OFF_DUTY":
      return "#FF493F";
    case "LEAVE":
      return "#0E9717";
    case "Full_Day":
      return "#CB48B7";
    case "ON_DUTY":
      return "#0E9717";
    case "HOLIDAY":
      return "#EE2B84";
    case "WEEK_OFF":
      return "#0D9191";
    case "DUTY_DONE":
      return "#0D9191";
    case "N/A":
      return "#919BB0";
    case "ON_BREAK":
      return "#FFA60C";

    default:
      return "#3174ad";
  }
};
export const getGetterBgColor = (title) => {
  switch (title) {
    case "ABSENT":
      return "#FFE4E2";
    case "PRESENT":
      return "#EDFCED";
    case "HALF_DAY":
      return "#F3EDFE";
    case "OFF_DUTY":
      return "#FFE4E2";
    case "LEAVE":
      return "#EDFCED";
    case "Full_Day":
      return "#FCEDFB";
    case "ON_DUTY":
      return "#EDFCED";
    case "HOLIDAY":
      return "#FFDEED";
    case "WEEK_OFF":
      return "#EBFCFC";
    case "DUTY_DONE":
      return "#EBFCFC";
    case "N/A":
      return "#EEF3FF";
    case "ON_BREAK":
      return "#FCF5ED";

    default:
      return "#3174ad";
  }
};

// const eventPropGetter = useCallback((e) => {
//   if (e.type === "ABSENT") {
//     return {
//       className: "status_absendt",
//       style: {
//         backgroundColor: "#FFE4E2",
//         color: "#FF493F",
//         outline: "none",
//         fontSize: "10px",
//         textAlign: "bottom",
//         padding: "20px",
//       },
//     };
//   } else if (e.type === "PRESENT") {
//     return {
//       className: "deliverySlot",
//       style: {
//         backgroundColor: "#EDFCED",
//         color: "#0E9717",

//         padding: "20px",
//         outline: "none",
//         fontSize: "10px",
//       },
//     };
//   } else if (e.type === "HALF_DAY") {
//     return {
//       className: "deliverySlot",
//       style: {
//         backgroundColor: "#F3EDFE",
//         color: "#7848CB",

//         padding: "20px",
//         outline: "none",
//         fontSize: "10px",
//       },
//     };
//   } else if (e.type === "OFF_DUTY") {
//     return {
//       className: "deliverySlot",
//       style: {
//         backgroundColor: "#FFE4E2",
//         color: "#FF493F",

//         padding: "20px",
//         outline: "none",
//         fontSize: "10px",
//       },
//     };
//   } else if (e.type === "LEAVE") {
//     return {
//       className: "deliverySlot",
//       style: {
//         backgroundColor: "#EDFCED",
//         color: "#0E9717",

//         padding: "20px",
//         outline: "none",
//         fontSize: "10px",
//       },
//     };
//   } else if (e.type === "Full_Day") {
//     return {
//       className: "deliverySlot",
//       style: {
//         backgroundColor: "#FCEDFB",
//         color: "#CB48B7",

//         padding: "20px",
//         outline: "none",
//         fontSize: "10px",
//       },
//     };
//   } else if (e.type === "ON_DUTY") {
//     return {
//       className: "deliverySlot",
//       style: {
//         backgroundColor: "#EDFCED",
//         color: "#0E9717",

//         padding: "20px",
//         outline: "none",
//         fontSize: "10px",
//       },
//     };
//   } else if (e.type === "HOLIDAY") {
//     return {
//       className: "deliverySlot",
//       style: {
//         backgroundColor: "#FFDEED",
//         color: "#EE2B84",

//         padding: "20px",
//         outline: "none",
//         fontSize: "10px",
//       },
//     };
//   } else if (e.type === "WEEK_OFF") {
//     return {
//       className: "deliverySlot",
//       style: {
//         backgroundColor: "#EBFCFC",
//         color: "#0D9191",

//         padding: "20px",
//         outline: "none",
//         fontSize: "10px",
//       },
//     };
//   }else if (e.type === "DUTY_DONE") {
//     return {
//       className: "deliverySlot",
//       style: {
//         backgroundColor: "#EBFCFC",
//         color: "#0D9191",

//         padding: "20px",
//         outline: "none",
//         fontSize: "10px",
//       },
//     };
//   } else if (e.type === "N/A") {
//     return {
//       className: "deliverySlot",
//       style: {
//         backgroundColor: "#EEF3FF",
//         color: "#919BB0",

//         padding: "20px",
//         outline: "none",
//         fontSize: "10px",
//       },
//     };
//   } else if (e.type === "ON_BREAK") {
//     return {
//       className: "deliverySlot",
//       style: {
//         backgroundColor: "#FCF5ED",
//         color: "#FFA60C",

//         padding: "20px",
//         outline: "none",
//         fontSize: "10px",
//       },
//     };
//   }
//   return {
//     style: {
//       border: "none",
//     },
//   };
// }, []);
