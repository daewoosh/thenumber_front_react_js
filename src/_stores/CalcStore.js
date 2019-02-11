import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';

import { observable, action, toJS } from 'mobx';
import { ajaxReq } from '_services/WebApi';

export const getCalcResult = (params) => {
    const res = ajaxReq('Calculate', 'POST', params, true)
    return res;
};

export const saveAim = (params) => {
    const res = ajaxReq('SaveAim', 'POST', params, true)
    return res;
};


export default class CalcStore extends BSMobxStore {
    constructor() {
        super({
            action: getCalcResult,
        });
    }

    @observable
    monthlyIncome = 0;

    @observable
    pensionAge = 0;

    @observable
    totalKapital = 0;

    @observable
    savedConservativeInvestments = 0;

    @observable
    savedModerateInvestments = 0;

    @observable
    savedAgressiveInvestments = 0;

    @observable
    conservativePercent = 0;

    @observable
    moderatePercent = 0;

    @observable
    agressivePercent = 0

    @observable
    periods = [];

    @observable
    desiredIncome = 0;

    @observable
    incomesByAges = [];

    @observable
    selectedAge = 0;

    @observable
    selectedIncome = 0;

    @observable
    selectedKapital = 0;

    @observable
    minAge = 0;

    @observable
    maxAge = 0;

    @observable
    maxIncome = 0;

    @observable
    minIncome = 0;

    @observable
    maxKapital = 0;

    @observable
    minKapital = 0;

    incomeRange = [];
    kapitalRange = [];

    isFullReport = true;

    @observable
    selectedPeriod = {}

    @observable
    decemberPeriods = []

    @observable
    reportFilled = false;

    @action
    getReport() {
        var getRes = getCalcResult();
        getRes.then((data) => this.setData(data))
            .catch((err) => {
                this.reportFilled = false;
            });
    }

    @action
    setData(data) {
        this.totalKapital = data.TotalKapital;
        this.monthlyIncome = data.MonthlyIncome;
        this.agressivePercent = data.AgressivePercent;
        this.conservativePercent = data.ConservativePercent;
        this.moderatePercent = data.ModeratePercent;
        this.savedAgressiveInvestments = data.SavedAgressiveInvestments;
        this.savedConservativeInvestments = data.SavedConservativeInvestments;
        this.savedModerateInvestments = data.SavedModerateInvestments;
        this.periods = data.Periods;
        this.desiredIncome = data.DesiredIncome;
        this.incomesByAges = data.IncomeByAges;
        var last_element = data.Periods[data.Periods.length - 1];
        this.selectedAge = last_element.CurrentAge;
        this.selectedKapital = Math.round(data.TotalKapital);
        this.selectedIncome = Math.round(data.MonthlyIncome);
        this.minAge = data.Periods[0].CurrentAge;
        this.maxAge = data.IncomeByAges[data.IncomeByAges.length - 1].Age;
        this.maxIncome = Math.round(data.IncomeByAges[data.IncomeByAges.length - 1].MonthlyIncome);
        this.minIncome = Math.round(data.IncomeByAges[0].MonthlyIncome);
        this.maxKapital = Math.round(data.IncomeByAges[data.IncomeByAges.length - 1].Kapital);
        this.minKapital = Math.round(data.IncomeByAges[0].Kapital);
        this.isFullReport = data.IsFull;
        this.pensionAge = data.PensionAge;
        this.getIncomeRange();
        super.setData();
        this.selectPeriod((new Date()).getFullYear());
        var ddd = data.Periods.filter(item => item.CurrentMonth == 12);
        debugger;
        this.decemberPeriods = data.Periods.filter(item => item.CurrentMonth == 12);
        this.reportFilled = true;
    }

    selectPeriod(year) {
        var copy = toJS(this.periods);
        var filtered = copy.filter(item => item.CurrentYear == year && item.CurrentMonth == 12)[0];
        this.selectedPeriod = filtered;
        var previousPeriod = copy.filter(item => item.CurrentYear === (year - 1) && item.CurrentMonth == 12)[0];
        if (previousPeriod) {
            this.selectedPeriod.prevInvestmentAmount = previousPeriod.TotalInvestments;
            this.selectedPeriod.prevModerateAmount = previousPeriod.SavedModerateInvestments;
            this.selectedPeriod.prevConservativeAmount = previousPeriod.SavedConservativeInvestments;
            this.selectedPeriod.prevAgressiveAmount = previousPeriod.SavedAgressiveInvestments;
        }
        else {
            this.selectedPeriod.prevInvestmentAmount = 0;
            this.selectedPeriod.prevModerateAmount = 0;
            this.selectedPeriod.prevConservativeAmount = 0;
            this.selectedPeriod.prevAgressiveAmount = 0;
        }
        this.selectedPeriod.expences = [];
        var allYearPeriods = copy.filter(item => item.CurrentYear == year);
        for (var i = 0; i < allYearPeriods.length; i++) {
            var monthName = this.getMonthName(allYearPeriods[i].CurrentMonth);
            if (allYearPeriods[i].Vacation > 0) {
                this.selectedPeriod.expences.push({ iconType: 'umbrella', amount: allYearPeriods[i].Vacation, month: monthName, name: 'Отпуск' });
            }
            if (allYearPeriods[i].OtherPlannedExpence > 0) {
                this.selectedPeriod.expences.push({ iconType: 'expence', amount: allYearPeriods[i].OtherPlannedExpence, month: monthName, name: 'Прочее' });
            }
        }
    }
    getMonthName(monthNumber) {
        if (monthNumber == '1')
            return 'Январь';
        if (monthNumber == '2')
            return 'Февраль';
        if (monthNumber == '3')
            return 'Март';
        if (monthNumber == '4')
            return 'Апрель';
        if (monthNumber == '5')
            return 'Май';
        if (monthNumber == '6')
            return 'Июнь';
        if (monthNumber == '7')
            return 'Июль';
        if (monthNumber == '8')
            return 'Август';
        if (monthNumber == '9')
            return 'Сентябрь';
        if (monthNumber == '10')
            return 'Октябрь';
        if (monthNumber == '11')
            return 'Ноябрь';
        if (monthNumber == '12')
            return 'Декабрь';
    }

    getIncomeRange() {
        this.incomeRange = [];
        this.kapitalRange = [];
        var copy = toJS(this.incomesByAges);
        if (this.isFullReport) {
            for (var index = 0; index < copy.length - 11; index++) {
                // debugger;
                if (copy[index].Month == 12) {
                    var diff = Math.round(copy[index + 11].MonthlyIncome) - Math.round(copy[index].MonthlyIncome);
                    if (diff === 0)
                        continue;
                    this.incomeRange.push({ value: Math.round(copy[index].MonthlyIncome), step: diff })
                    this.kapitalRange.push({ value: Math.round(copy[index].Kapital), step: Math.round(copy[index + 11].Kapital) - Math.round(copy[index].Kapital) })
                }
            }
        }
        else {
            for (var index = 1; index < copy.length - 1; index++) {

                this.incomeRange.push({ value: Math.round(copy[index].MonthlyIncome), step: Math.round(copy[index + 1].MonthlyIncome) - Math.round(copy[index].MonthlyIncome) })
                this.kapitalRange.push({ value: Math.round(copy[index].Kapital), step: Math.round(copy[index + 1].Kapital) - Math.round(copy[index].Kapital) })
            }
        }
        this.kapitalRange.push({ value: Math.round(copy[copy.length - 1].Kapital) })
        this.incomeRange.push({ value: Math.round(copy[copy.length - 1].MonthlyIncome) });
    }

    toObject(arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i] !== undefined) rv[i] = arr[i].value + '';
        }
        return rv;
    }

    @action
    updateByAge(age) {
        this.selectedAge = age;
        var copy = toJS(this.incomesByAges);
        const filteredArray = copy.filter(item => item.Age == age && item.Month == 12);
        this.selectedIncome = Math.round(filteredArray[0].MonthlyIncome);
        this.selectedKapital = Math.round(filteredArray[0].Kapital);
    }

    @action
    updateByIncome(income) {
        var copy = toJS(this.incomesByAges);
        var cc = this.closest(income, copy);
        this.selectedAge = cc.Age;
        this.selectedIncome = Math.round(cc.MonthlyIncome);
        this.selectedKapital = Math.round(cc.Kapital)
    }

    closest(num, arr) {
        var curr = arr[0];
        var diff = Math.abs(num - curr.MonthlyIncome);
        for (var val = 0; val < arr.length; val++) {
            if (arr[val].Month == 12) {
                var newdiff = Math.abs(num - arr[val].MonthlyIncome);
                if (newdiff < diff) {
                    diff = newdiff;
                    curr = arr[val];
                }
            }
        }
        return curr;
    }

    @action
    saveAim() {
        const params = { age: this.selectedAge };
        var saveRes = saveAim(params);
        return saveRes;

    }


}