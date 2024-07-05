import React from "react";
import CalendarMui from "./components/CalendarMui/CalendarMui";
import styles from "./Style.module.css";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import CalendarDetail from "./components/FullCalendar/FullCalendar";
import PageBox from "../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import useCalendarList from "./CalendarList.hook";
import EventForm from "./components/EventForm/EventForm.view";
import { Add } from "@material-ui/icons";
import { ButtonBase } from "@material-ui/core";

function CalendarList() {
  const {
    isSidePanel,
    handleSideToggle,
    checkedItems,
    handleCheckboxChange,
    filteredData,
    selectedDate,
    handleDateChange,
    editData,
    renderList,
  } = useCalendarList({});
  const checkboxLabel = {
    color: "#636578",
    fontWeight: "bold",
    fontSize: "14px",
    fontWeight: "500",
  };
  return (
    <PageBox>
      <div className={styles.mainFlex}>
        <div className={styles.left}>
          <div className={styles.calContainer}>
            <ButtonBase
              type={"button"}
              onClick={() => handleSideToggle()}
              className={styles.createBtn}
            >
              <Add fontSize={"small"} className={"plusIcon"}></Add>
              ADD HOLIDAY
            </ButtonBase>
            <div className="calender_Wrapper">
              <CalendarMui
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
            </div>
          </div>
          <div className={styles.lowerWrap}>
            <div className={styles.title}>FILTER</div>
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#636578", borderColor: "#636578" }}
                    name="all"
                    checked={checkedItems?.all}
                    onChange={handleCheckboxChange}
                  />
                }
                style={checkboxLabel}
                label="View All"
              />
            </div>
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#72e128" }}
                    name="GAZETTED"
                    checked={checkedItems?.GAZETTED}
                    onChange={handleCheckboxChange}
                  />
                }
                style={checkboxLabel}
                label="Holiday"
              />
            </div>
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#ff4d49" }}
                    name="RESTRICTED"
                    checked={checkedItems?.RESTRICTED}
                    onChange={handleCheckboxChange}
                  />
                }
                style={checkboxLabel}
                label="Restricted Holiday"
              />
            </div>
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#666cff" }}
                    name="OPTIONAL"
                    checked={checkedItems?.OPTIONAL}
                    onChange={handleCheckboxChange}
                  />
                }
                style={checkboxLabel}
                label="Optional (only 1 can be taken)"
              />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <CalendarDetail
            data={filteredData}
            selectedDate={selectedDate}
            handleSideToggle={handleSideToggle}
          />
        </div>
      </div>
      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={`${editData?.id ? "Update " : "Add"} Holiday`}
        open={isSidePanel}
        side={"right"}
      >
        <EventForm
          isOpen={isSidePanel}
          handleToggle={handleSideToggle}
          editData={editData}
          renderList={renderList}
        />
      </SidePanelComponent>
    </PageBox>
  );
}

export default CalendarList;
