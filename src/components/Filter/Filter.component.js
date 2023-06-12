
import React, { Component } from 'react';
import { Button, TextField, Select, Popover, Menu, MenuItem, LinearProgress, FormControlLabel, FormGroup, Checkbox, withStyles, FormControl, InputLabel  } from '@material-ui/core';
// import FlatButton from 'material-ui/FlatButton';
// import SelectField from 'material-ui/SelectField';
import { FilterList as FilterIcon, Search as SearchIcon, Add } from '@material-ui/icons';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PropTypes from 'prop-types';
// import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import _ from 'lodash';
// import Add from 'material-ui/svg-icons/content/add';
import cstyles from './Style.module.css';

const styles = {
    flatButton: {
        float: 'right',
        border: '1px solid #2896E9',
        borderRadius: '30px',
        textTransform: 'capitalize',
        padding: '6px 15px',
        color: '#2896E9'
    },
};
const useStyles = {
    formControl: {
        minWidth: 205,
    },
}
class FilterComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            filter: [],
            selectedFilters: [],
            query: ''
        };
        this.changed = _.debounce((value) => { this.props.handleFilterDataChange(value); }, 200);
        this._handleSearchChange = this._handleSearchChange.bind(this);
        this.changedSearch = _.debounce((value) => { this.props.handleSearchValueChange(value); }, 500);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this._handleSearchBlur = this._handleSearchBlur.bind(this);
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    _handleSearchChange(e) {
        this.setState({
            query: e.target.value,
        })
        this.changedSearch(e.target.value);
    }

    _handleSearchBlur() {

    }

    detailhandleChange(i, event, index, val) {

        console.log('detailhandleChange', i, event, index, val);
        const value = this.state.filter;
        if ((value[i]).type == 'text') {
            (value[i]).value = event.target.value;
        }
        if ((value[i]).type == 'select' || (value[i]).type == 'selectObject') {
            (value[i]).value = event.target.value;
        }
        if ((value[i]).type == 'date') {
            const tempDate = (new Date(event));
            (value[i]).value = `${tempDate.getFullYear()}-${parseInt(tempDate.getMonth()) + 1}-${tempDate.getDate()}`;
        }
        this.setState({ filter: value });
        this.changed(value);
    }
    addClick() {

    }

    removeClick(i) {
        const value = this.state.filter.slice();
        value.splice(i, 1);
        const selectedFilters = this.state.selectedFilters.slice();
        selectedFilters.splice(i, 1);
        this.setState({
            filter: value,
            selectedFilters,
        });
        this.props.handleFilterDataChange(value);
    }
    addValue(val, i) {
        if (val.type == 'text') {
            return (
                <TextField
                    hintText={val.label.toUpperCase()}
                    type="text"
                    value={val.value || ''}
                    // floatingLabelText={val.name.toUpperCase()}
                    placeholder={val.label.toUpperCase()}
                    name={val.name}
                    onChange={this.detailhandleChange.bind(this, i)}
                />
            );
        }
        if (val.type == 'date') {
            return (

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        disabled={this.state.is_edit}
                        fullWidth
                        name={val.name}
                        variant="outlined"
                        label={val.label.toUpperCase()}
                        value={val.value ? val.value : new Date()}
                        onChange={this.detailhandleChange.bind(this, i)}
                        format={
                            "MM/dd/yyyy"
                        }
                        maxDate={val.options ? val.options.maxDate : null}
                        mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                    />
                </MuiPickersUtilsProvider>
                // <DatePicker
                //     // floatingLabelText={val.name.toUpperCase()}
                //     hintText={val.label.toUpperCase()}
                //     name={val.name}
                //     onChange={this.detailhandleChange.bind(this, i)}
                // />
            );
        }
        if (val.type == 'select') {
            const { classes } = this.props;
            const uiItems = [];
            val.fields.forEach((val) => {
                uiItems.push(
                    <MenuItem key={val} value={val}>{val ? val.replace(/_/g," "):''}</MenuItem>
                );
            });
            return (
                <FormControl className={classes.formControl}>
                    <InputLabel id={'select'+val.name}>{val.label.toUpperCase()}</InputLabel>
                    <Select
                        classes={{select: classes.selectRoot, root: classes.selectRoot}}
                        labelId={'select'+val.name}
                        // floatingLabelText={val.name.toUpperCase()}
                        value={this.state.filter[i].value}
                        onChange={this.detailhandleChange.bind(this, i)}
                    >
                        {uiItems}
                    </Select>
                </FormControl>
            );
        }
        if (val.type == 'selectObject') {
            const { classes } = this.props;
            const uiItems = [];
            val.fields.forEach((obj) => {
                uiItems.push(
                    <MenuItem key={obj[val.custom.extract.id]} value={obj[val.custom.extract.id]}>{obj[val.custom.extract.title]}</MenuItem>
                );
            });
            return (
                <FormControl className={classes.formControl}>
                    <InputLabel id={'select'+val.name}>{val.label.toUpperCase()}</InputLabel>
                    <Select
                        classes={{select: classes.selectRoot, root: classes.selectRoot}}
                        labelId={'select'+val.name}
                        // floatingLabelText={val.name.toUpperCase()}
                        value={this.state.filter[i].value}
                        onChange={this.detailhandleChange.bind(this, i)}
                    >
                        {uiItems}
                    </Select>
                </FormControl>
            );
        }
    }
    createUI() {
        const uiItems = [];
        for (let i = 0; i < this.state.filter.length; i++) {
            const tempFilter = this.state.filter[i];
            uiItems.push(
                <div key={i} style={{ display: 'flex', padding: '0px 5px', marginTop: '10px', flex: '1 1 calc(50% - 10px)', alignItems: 'center' }}>
                    {this.addValue(tempFilter, i)}
                    {/*<button*/}
                    {/*    style={{ height: '32px',  border: '0px', color: black, fontWeight: 'bold', padding: '0px 10px', cursor: 'pointer' }}*/}
                    {/*    onClick={this.removeClick.bind(this, i)}*/}
                    {/*>X</button>*/}
                </div>,
            );
        }
        if (uiItems.length > 0) {
            return (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {uiItems}
                </div>
            );
        }
        return null;
    }
    handleMenuClick(val) {
        console.log('handleMenuClick',val);
        const index = (this.state.selectedFilters.indexOf(val.name))
        const filter = this.state.filter;
        const selectedFilters = this.state.selectedFilters;
        let newFilter = [];
        if (index > -1) {
            filter.splice(index, 1);
            newFilter = filter;
            selectedFilters.splice(index, 1);
            this.props.handleFilterDataChange(newFilter);
        } else {
            selectedFilters.push(val.name);
            newFilter = [...filter, { custom: val.custom, label: val.label, name: val.name, value: '', type: val.type, fields: val.fields, options: val.options }];
        }
        this.setState({ filter: newFilter, selectedFilters });

    }
    createMenu(items) {
        const uiItems = [];
        items.forEach((val) => {
            if (this.state.selectedFilters.indexOf(val.name) < 0) {
                uiItems.push(
                    <MenuItem key={val.name} onClick={this.handleMenuClick.bind(this, val)} >{val.label}</MenuItem>,
                );
            }
        });
        return uiItems;
    }
    _renderProgress() {
        if(this.props.is_progress ) {
            return ( <LinearProgress  color="primary" /> );
        } else {
            return null;
        }

    }
    _renderCheckboxes(items) {
        const tempCheckboxes = items.map((val) => {
            const isThere = (this.state.selectedFilters.indexOf(val.name) >= 0);
            return (
                <FormControlLabel
                    control={
                        <Checkbox checked={isThere} onChange={() => { this.handleMenuClick(val)}} value={val.name}/>
                    }
                    label={val.label}
                />);
        });

        return (
            <FormGroup row>
                {tempCheckboxes}
            </FormGroup>
        )
    }

    render() {
        return (
            <div className={`${this.props.filterWidth ?cstyles.wwe :"" }`}>
                <br/>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', }}>
                    <div style={{ flex: 1 }}>
                        <div className={cstyles.inputContainer}>
                            <input onBlur={this._handleSearchBlur} value={this.state.query} onChange={this._handleSearchChange} className={cstyles.searchInput} placeholder={'Search'}/>
                            <div className={'filterSearchIcon'}>
                                <SearchIcon fontSize={'medium'}/>
                            </div>
                        </div>
                        {this._renderProgress()}
                    </div>
                    {this.props.filters && this.props.filters.length > 0 && (
                        <div style={{ padding: 10, marginLeft: 5 }}>
                            {/*<FlatButton*/}
                            {/*    style={styles.flatButton}*/}
                            {/*    onClick={this.handleTouchTap}*/}
                            {/*    icon={<Add />}*/}
                            {/*    containerElement={<FilterIcon/>}*/}
                            {/*    primary*/}
                            {/*/>*/}
                            <div>
                                <Button style={styles.flatButton} onClick={this.handleTouchTap} ><span style={{marginRight:'7px'}}>Filter</span><FilterIcon className={'filterColor'}/></Button>
                            </div>
                            {/*<Menu*/}
                            {/*    id="simple-menu"*/}
                            {/*    anchorEl={this.state.anchorEl}*/}
                            {/*    keepMounted*/}
                            {/*    open={this.state.open}*/}
                            {/*    onClose={this.handleRequestClose}*/}
                            {/*>*/}
                            {/*    {this.createMenu(this.props.filters)}*/}
                            {/*</Menu>*/}
                            <Popover
                                id={'popoverId'}
                                open={this.state.open}
                                anchorEl={this.state.anchorEl}
                                onClose={this.handleRequestClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <div style={{minWidth: 'calc(30vw)', padding: '20px'}}>
                                    {this._renderCheckboxes(this.props.filters)}
                                    <div style={{  display: 'flex' }}>
                                        {this.createUI([])}
                                    </div>
                                </div>
                            </Popover>
                        </div>)}
                </div>

            </div>
        );
    }
}
FilterComponent.defaultTypes = {
    is_progress: false,
    filterWidth: false
}
FilterComponent.propTypes = {
    is_progress: PropTypes.bool
}

export default withStyles(useStyles)(FilterComponent);
