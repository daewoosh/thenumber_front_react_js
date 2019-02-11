import React from 'react';
import { observer, toJS } from 'mobx-react';
import { getComp } from '../bs_react_lib/utils/bsDI';
import ReactTable from "react-table";
import "react-table/react-table.css";
import NumberFormat from 'react-number-format';
import { TargetSliders } from './Sliders';


@observer
export class Report extends React.Component {
    constructor(props) {
        super(props);
        this.calcStore = getComp('CalcStore');
    }

    componentWillMount() {
        this.calcStore.load();
    }

    render() {
        const { totalKapital, monthlyIncome, desiredIncome } = this.calcStore;
        const { agressivePercent, conservativePercent, moderatePercent } = this.calcStore;
        const { savedAgressiveInvestments, savedConservativeInvestments, savedModerateInvestments } = this.calcStore;
        const { periods } = this.calcStore;

        // debugger;
        // var tt = toJS(periods);
        return (
            <div>

                <TargetSliders />
                <ReactTable
                    getTrProps={(state, rowInfo, column) => {
                        var rowColor = "grey";
                        if (rowInfo.row.HasError)
                            rowColor = "red";
                        if (rowInfo.row.HasWarning)
                            rowColor = "sandyBrown ";                       
                        return {
                            style: {
                                color: rowColor
                            }
                        };
                    }}

                    showPagination={false}
                    sortable={false}
                    defaultPageSize={1000}
                    minRows={0}
                    resizable={false}
                    className="-striped -highlight"
                    data={periods}
                    columns={
                        [
                            {
                                Header: "",
                                accessor: "HasError",
                                width: 0,
                                show: false,
                            },
                            {
                                Header: "",
                                accessor: "HasWarning",
                                width: 0,
                                show: false,
                            },
                            {
                                Header: "Сообщение",
                                accessor: "InfoMessage",
                                width: 100,
                                style: { 'whiteSpace': 'unset' }
                            },
                            {
                                Header: "Возраст",
                                accessor: "CurrentAge",
                                width: 80
                            },
                            {
                                Header: "ГОД",
                                accessor: "CurrentYear",
                                width: 80
                            },
                            {
                                Header: "Month",
                                accessor: "CurrentMonth",
                                width: 80
                            },
                            {
                                Header: () => (
                                    <div>
                                        <p> Первичное</p>
                                        <p> накопление в</p>
                                        <p> банке</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.BankSavingsAfterInvestments)} displayType={'text'} thousandSeparator={' '} />,
                                id: "BankSavingsAfterInvestments",
                                width: 85
                            },
                            {
                                Header: () => (
                                    <div>
                                        <p> Сдача в</p>
                                        <p>аренду</p>
                                        <p> недвижимости</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.ApartmentRentPeriodTotal)} displayType={'text'} thousandSeparator={' '} />,
                                id: "ApartmentRentPeriodTotal",
                                width: 85
                            }
                            ,
                            {
                                Header: "Бонусы",
                                accessor: d => <NumberFormat value={Math.round(d.Bonuses)} displayType={'text'} thousandSeparator={' '} />,
                                id: "Bonuses",
                                width: 85
                            }
                            ,
                            {
                                Header: () => (
                                    <div>
                                        <p>Другие</p>
                                        <p>доходы</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.OtherIncome)} displayType={'text'} thousandSeparator={' '} />,
                                id: "OtherIncome",
                                width: 85
                            }
                            ,
                            {
                                Header: () => (
                                    <div>
                                        <p> Остаток в банке </p>
                                        <p>после</p>
                                        <p> инвестирования</p>
                                        <p> и расходов</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.BankRest)} displayType={'text'} thousandSeparator={' '} />,
                                id: "BankRest",
                                width: 85
                            }
                            ,
                            {
                                Header: () => (
                                    <div>
                                        <p> Накоплено</p>
                                        <p>консервативных</p>
                                        <p> вложений</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.SavedConservativeInvestments)} displayType={'text'} thousandSeparator={' '} />,
                                id: "SavedConservativeInvestments",
                                width: 85
                            }
                            ,
                            {
                                Header: () => (
                                    <div>
                                        <p> Накоплено</p>
                                        <p>умеренных</p>
                                        <p> вложений</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.SavedModerateInvestments)} displayType={'text'} thousandSeparator={' '} />,
                                id: "SavedModerateInvestments",
                                width: 85
                            }
                            ,
                            {
                                Header: () => (
                                    <div>
                                        <p> Накоплено</p>
                                        <p>агрессивных</p>
                                        <p> вложений</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.SavedAgressiveInvestments)} displayType={'text'} thousandSeparator={' '} />,
                                id: "SavedAgressiveInvestments",
                                width: 85
                            }
                            ,
                            {
                                Header: () => (
                                    <div>
                                        <p> КАПИТАЛ</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.Kapital)} displayType={'text'} thousandSeparator={' '} />,
                                id: "Kapital",
                                width: 85
                            }
                            ,
                            {
                                Header: () => (
                                    <div>
                                        <p>Инвестирование </p>
                                        <p>в консервативные</p>
                                        <p> инструменты</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.ConservativeInvestmentAmount)} displayType={'text'} thousandSeparator={' '} />,
                                id: "ConservativeInvestmentAmount",
                                width: 85
                            }
                            ,
                            {
                                Header: () => (
                                    <div>
                                        <p>Инвестирование </p>
                                        <p>в умеренные</p>
                                        <p> инструменты</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.ModerateInvestmentAmount)} displayType={'text'} thousandSeparator={' '} />,
                                id: "ModerateInvestmentAmount",
                                width: 85
                            }
                            ,
                            {
                                Header: () => (
                                    <div>
                                        <p>Инвестирование </p>
                                        <p>в агрессивные</p>
                                        <p> инструменты</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.AgressiveInvestmentAmount)} displayType={'text'} thousandSeparator={' '} />,
                                id: "AgressiveInvestmentAmount",
                                width: 85
                            }
                            ,
                            {
                                Header: () => (
                                    <div>
                                        <p> Отпуск</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.Vacation)} displayType={'text'} thousandSeparator={' '} />,
                                id: "Vacation",
                                width: 85
                            }
                            ,
                            {
                                Header: () => (
                                    <div>
                                        <p>Другие </p>
                                        <p>планоые</p>
                                        <p>расходы</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.OtherPlannedExpence)} displayType={'text'} thousandSeparator={' '} />,
                                id: "OtherPlannedExpence",
                                width: 85
                            }
                            , {
                                Header: () => (
                                    <div>
                                        <p>Ежегодные  </p>
                                        <p>расходы</p>

                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.AnnualExpence)} displayType={'text'} thousandSeparator={' '} />,
                                id: "AnnualExpence",
                                width: 85
                            }
                            , {
                                Header: () => (
                                    <div>
                                        <p>платежи по </p>
                                        <p> кредиту</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Number((d.CreditPayment).toFixed(2))} displayType={'text'} thousandSeparator={' '} />,
                                id: "CreditPayment",
                                width: 85
                            }
                            , {
                                Header: () => (
                                    <div>
                                        <p>Доля</p>
                                        <p>консервативных</p>
                                    </div>
                                ),
                                accessor: d => Math.round(d.ConservativeNormative * 100) + '%',
                                id: "ConservativeNormative",
                                width: 85
                            }
                            , {
                                Header: () => (
                                    <div>
                                        <p>Доля </p>
                                        <p>умеренных</p>
                                    </div>
                                ),
                                accessor: d => Math.round(d.ModerateNormative * 100) + '%',
                                id: "ModerateNormative",
                                width: 85
                            }
                            , {
                                Header: () => (
                                    <div>
                                        <p>Доля </p>
                                        <p> агрессивных</p>
                                    </div>
                                ),
                                accessor: d => Math.round(d.AgressiveNormative * 100) + '%',
                                id: "AgressiveNormative",
                                width: 85
                            }
                        ]
                    }
                />
                <p>Капитал всего <NumberFormat value={Math.round(totalKapital)} displayType={'text'} thousandSeparator={' '} />  </p>
                <p>Ежемесячный доход  <NumberFormat value={Math.round(monthlyIncome)} displayType={'text'} thousandSeparator={' '} /> </p>
                <p>Желаемый ежемесячный доход  <NumberFormat value={Math.round(desiredIncome)} displayType={'text'} thousandSeparator={' '} /> </p>

            </div>
        );
    }
}