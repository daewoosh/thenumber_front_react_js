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
        const { totalCapital, monthlyIncome, desiredIncome } = this.calcStore;
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
                                        <p> Сдача в</p>
                                        <p>аренду</p>
                                        <p> недвижимости</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.ApartmentRent)} displayType={'text'} thousandSeparator={' '} />,
                                id: "ApartmentRent",
                                width: 85
                            }
                            ,
                            {
                                Header: "Зарплата",
                                accessor: d => <NumberFormat value={Math.round(d.Salary)} displayType={'text'} thousandSeparator={' '} />,
                                id: "Salary",
                                width: 85
                            }
                            ,
                             {
                                Header: () => (
                                    <div>
                                        <p>Получение</p>
                                        <p>кредита</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.CreditRecieve)} displayType={'text'} thousandSeparator={' '} />,
                                id: "CreditRecieve",
                                width: 85
                            },
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
                                        <p>Отпуск</p>                                        
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
                                        <p>Другие расходы</p>                                        
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.OtherExpences)} displayType={'text'} thousandSeparator={' '} />,
                                id: "OtherExpences",
                                width: 85
                            }
                            ,
                            {
                                Header: () => (
                                    <div>
                                        <p>Плетежи по кредиту</p>                                        
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.CreditPayments)} displayType={'text'} thousandSeparator={' '} />,
                                id: "CreditPayments",
                                width: 85
                            }
                            ,

                            {
                                Header: () => (
                                    <div>
                                        <p> Депозитная </p>
                                        <p>Ставка</p>
                                        <p> годовых</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.BankDepositRatePercent)} displayType={'text'} thousandSeparator={' '} />,
                                id: "BankDepositRatePercent",
                                width: 85
                            }
                            ,

                            {
                                Header: () => (
                                    <div>
                                        <p> Инфляция </p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.InflationRatePercent)} displayType={'text'} thousandSeparator={' '} />,
                                id: "InflationRatePercent",
                                width: 85
                            }
                            ,

                            {
                                Header: () => (
                                    <div>
                                        <p> Остаток в банке </p>
                                        <p>после</p>
                                        <p> расходов</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.BankRestAfterExpences)} displayType={'text'} thousandSeparator={' '} />,
                                id: "BankRestAfterExpences",
                                width: 85
                            }
                            ,

                            {
                                Header: () => (
                                    <div>
                                        <p> платеж </p>
                                        <p>В резервный</p>
                                        <p> фонд</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.ReserveFundPayment)} displayType={'text'} thousandSeparator={' '} />,
                                id: "ReserveFundPayment",
                                width: 85
                            },

                            {
                                Header: () => (
                                    <div>
                                        <p> Ивест.в конс. </p>
                                        <p>инструменты</p>
                                        <p> поступления</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.SaleConservativeInvestments)} displayType={'text'} thousandSeparator={' '} />,
                                id: "SaleConservativeInvestments",
                                width: 85
                            },

                            {
                                Header: () => (
                                    <div>
                                        <p> Ивест.в умер. </p>
                                        <p>инструменты</p>
                                        <p> поступления</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.SaleModerateInvestments)} displayType={'text'} thousandSeparator={' '} />,
                                id: "SaleModerateInvestments",
                                width: 85
                            },

                            {
                                Header: () => (
                                    <div>
                                        <p> Ивест.в агр. </p>
                                        <p>инструменты</p>
                                        <p> поступления</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.SaleAgressiveInvestments)} displayType={'text'} thousandSeparator={' '} />,
                                id: "SaleAgressiveInvestments",
                                width: 85
                            },
                            {
                                Header: () => (
                                    <div>
                                        <p> Ивест.в конс. </p>
                                        <p>инструменты</p>
                                        <p> платежи</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.ConservativeInvestments)} displayType={'text'} thousandSeparator={' '} />,
                                id: "ConservativeInvestments",
                                width: 85
                            },
                            {
                                Header: () => (
                                    <div>
                                        <p> Ивест.в умер. </p>
                                        <p>инструменты</p>
                                        <p> платежи</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.ModerateInvestments)} displayType={'text'} thousandSeparator={' '} />,
                                id: "ModerateInvestments",
                                width: 85
                            },

                            {
                                Header: () => (
                                    <div>
                                        <p> Ивест.в агр. </p>
                                        <p>инструменты</p>
                                        <p> платежи</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.AgressiveInvestments)} displayType={'text'} thousandSeparator={' '} />,
                                id: "AgressiveInvestments",
                                width: 85
                            },

                            {
                                Header: () => (
                                    <div>
                                        <p> отсаток </p>
                                        <p>в банке</p>
                                        <p> на конец м.</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.BankRestAtMonthEnd)} displayType={'text'} thousandSeparator={' '} />,
                                id: "BankRestAtMonthEnd",
                                width: 85
                            },

                            {
                                Header: () => (
                                    <div>
                                        <p> РЕЗЕРВ </p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.ReserveFundTotalGrow)} displayType={'text'} thousandSeparator={' '} />,
                                id: "ReserveFundTotalGrow",
                                width: 85
                            },

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
                                accessor: d => <NumberFormat value={Math.round(d.Capital)} displayType={'text'} thousandSeparator={' '} />,
                                id: "Сapital",
                                width: 85
                            },
                            {
                                Header: () => (
                                    <div>
                                        <p> КАПИТАЛ</p>
                                        <p> с инфл.</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.CapitalWithInflation)} displayType={'text'} thousandSeparator={' '} />,
                                id: "CapitalWithInflation",
                                width: 85
                            },
                            {
                                Header: () => (
                                    <div>
                                        <p> средства</p>
                                        <p> доступные для</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.FundsFreeForInvestments)} displayType={'text'} thousandSeparator={' '} />,
                                id: "FundsFreeForInvestments",
                                width: 85
                            },
                            {
                                Header: () => (
                                    <div>
                                        <p> капитал</p>
                                        <p> до инвест.</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.CapitalBeforeInvestments)} displayType={'text'} thousandSeparator={' '} />,
                                id: "CapitalBeforeInvestments",
                                width: 85
                            },

                            {
                                Header: () => (
                                    <div>
                                        <p> капитал</p>
                                        <p> после инвест.</p>
                                    </div>
                                ),
                                accessor: d => <NumberFormat value={Math.round(d.CapitalAfterInvestments)} displayType={'text'} thousandSeparator={' '} />,
                                id: "CapitalAfterInvestments",
                                width: 85
                            },
                            {
                                Header: () => (
                                    <div>
                                        <p>Доля</p>
                                        <p>консервативных</p>
                                        <p>факт.</p>
                                    </div>
                                ),
                                accessor: d => Math.round(d.ActualConservativeSpreadPercent * 100) + '%',
                                id: "ActualConservativeSpreadPercent",
                                width: 85
                            }
                            , {
                                Header: () => (
                                    <div>
                                        <p>Доля </p>
                                        <p>умеренных</p>
                                        <p>факт.</p>
                                    </div>
                                ),
                                accessor: d => Math.round(d.ActualModerateSpreadPercent * 100) + '%',
                                id: "ActualModerateSpreadPercent",
                                width: 85
                            }
                            , {
                                Header: () => (
                                    <div>
                                        <p>Доля </p>
                                        <p> агрессивных</p>
                                        <p>факт.</p>
                                    </div>
                                ),
                                accessor: d => Math.round(d.ActualAgressiveSpreadPercent * 100) + '%',
                                id: "ActualAgressiveSpreadPercent",
                                width: 85
                            },
                          {
                                Header: () => (
                                    <div>
                                        <p>Доля</p>
                                        <p>консервативных</p>
                                    </div>
                                ),
                                accessor: d => Math.round(d.TargetConservateSpreadPercent * 100) + '%',
                                id: "TargetConservateSpreadPercent",
                                width: 85
                            }
                            , {
                                Header: () => (
                                    <div>
                                        <p>Доля </p>
                                        <p>умеренных</p>
                                    </div>
                                ),
                                accessor: d => Math.round(d.TargetModerateSpreadPercent * 100) + '%',
                                id: "TargetModerateSpreadPercent",
                                width: 85
                            }
                            , {
                                Header: () => (
                                    <div>
                                        <p>Доля </p>
                                        <p> агрессивных</p>
                                    </div>
                                ),
                                accessor: d => Math.round(d.TargetAgressiveSpreadPercent * 100) + '%',
                                id: "TargetAgressiveSpreadPercent",
                                width: 85
                            }
                        ]
                    }
                />
                <p>Капитал всего <NumberFormat value={Math.round(totalCapital)} displayType={'text'} thousandSeparator={' '} />  </p>
                <p>Ежемесячный доход  <NumberFormat value={Math.round(monthlyIncome)} displayType={'text'} thousandSeparator={' '} /> </p>
                <p>Желаемый ежемесячный доход  <NumberFormat value={Math.round(desiredIncome)} displayType={'text'} thousandSeparator={' '} /> </p>

            </div>
        );
    }
}