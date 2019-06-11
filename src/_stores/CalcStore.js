import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';
import { getComp } from '../bs_react_lib/utils/bsDI';

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
    totalСapital = 0;

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
    selectedLiveAge = 0;

    @observable
    selectedYear = 0;

    @observable
    selectedIncome = 0;

    @observable
    selectedCapital = 0;

    @observable
    selectedSpendAmount = 0;

    @observable
    minAge = 0;

    @observable
    maxAge = 0;

    @observable
    maxIncome = 0;

    @observable
    minIncome = 0;

    @observable
    maxСapital = 0;

    @observable
    minСapital = 0;

    incomeRange = [];
    сapitalRange = [];

    isFullReport = true;

    @observable
    selectedPeriod = {}

    @observable
    decemberPeriods = []

    @observable
    reportFilled = false;

    @observable
    isInflationSelected = false;

    @observable
    spendCapital = false;

    @action
    getReport(isReload) {
        //если отчет загружен
        //то если  isReload то порегрузим его
        //а если нет, то ничего не делаем
        if (this.reportFilled === true) {
            if (isReload === true) { }
            else
                return false;
        }
        var getRes = getCalcResult();
        getRes.then((data) => this.setData(data))
            .catch((err) => {
                this.reportFilled = false;
            });
    }

    @action
    setData(data) {
        this.totalСapital = data.TotalСapital;
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
        this.selectedLiveAge = data.SpendTillAge;

        this.isInflationSelected = data.UseInflation;
        // debugger;
        // if (this.isInflationSelected===true) {
        //     this.selectedCapital = Math.round(data.TotalСapital);
        // }
        // else {
        //     this.selectedCapital = Math.round(data.TotalCapitalWithInflation);
        // }
        //this.selectedIncome = Math.round(data.MonthlyIncome);
        this.minAge = data.Periods[0].CurrentAge;
        this.maxAge = data.IncomeByAges[data.IncomeByAges.length - 1].Age;
        this.maxIncome = Math.round(data.IncomeByAges[data.IncomeByAges.length - 1].MonthlyIncome);
        this.minIncome = Math.round(data.IncomeByAges[0].MonthlyIncome);
        this.maxСapital = Math.round(data.IncomeByAges[data.IncomeByAges.length - 1].Capital);
        this.minСapital = Math.round(data.IncomeByAges[0].Сapital);
        this.isFullReport = data.IsFull;
        this.pensionAge = data.PensionAge;
        this.getIncomeRange();
        this.selectCapitalAndIncome();
        this.initRecommendationStore(data.Periods);
        super.setData();
        this.selectPeriod((new Date()).getFullYear());
        this.decemberPeriods = data.Periods.filter(item => item.CurrentMonth == 12);

        this.spendCapital = data.SpendCapital;
        this.reportFilled = true;
    }

    initRecommendationStore(allPeriods) {
        var currentDate = new Date();
        var currentPeriod = allPeriods.filter(item=>item.CurrentMonth == (currentDate.getMonth()+1) && item.CurrentYear == currentDate.getFullYear())[0];
        if (currentPeriod){
            var recomStore = getComp('RecommendationStore');
            recomStore.setCurrentRecommendations(currentPeriod.Recommendations);
        }

    }

    selectCapitalAndIncome() {
        var copy = toJS(this.incomesByAges);
        for (var i = 0; i < copy.length - 11; i++) {
            if (copy[i].Age === this.pensionAge) {
                this.selectedYear = copy[i].Year;
                // this.selectedCapital = copy[i].Capital;
                // this.selectedIncome = copy[i].MonthlyIncome;
            }
            // if (copy[i].Age === this.selectedLiveAge) {
            //     this.selectedSpendAmount = this.calcMonthlySpend(copy[i].Capital);
            // }           
        }
        const filteredArray = copy.filter(item => item.Age == this.selectedAge && item.Month == 12);
        this.selectedIncome = Math.round(filteredArray[0].MonthlyIncome);

        let capital;

        if (this.isInflationSelected === true) {
            capital = Math.round(filteredArray[0].CapitalWithInflation);
        }
        else {
            capital = Math.round(filteredArray[0].Capital);
        }
        this.selectedCapital = capital;
        this.selectedSpendAmount = this.calcMonthlySpend(this.selectedCapital);
    }

    calcMonthlySpend(capital) {
        const A = capital;
        const i = 0.1;
        const n = this.selectedLiveAge - this.selectedAge;
        const m = 12;
        const pow = Math.pow((1 + (i / m)), (m * n));

        var top = A * pow;
        var bottom = (m / i) * (pow - 1);

        return top / bottom;
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
            if (allYearPeriods[i].OtherExpences > 0) {
                this.selectedPeriod.expences.push({ iconType: 'expence', amount: allYearPeriods[i].OtherExpences, month: monthName, name: 'Прочее' });
            }
            if (allYearPeriods[i].CreditPayments > 0) {
                this.selectedPeriod.expences.push({ iconType: 'moneyBag', amount: allYearPeriods[i].CreditPayments, month: monthName, name: 'Кредит' });
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
        this.capitalRange = [];
        var copy = toJS(this.incomesByAges);
        if (this.isFullReport) {
            for (var index = 0; index < copy.length - 11; index++) {
                // debugger;
                if (copy[index].Month == 12) {
                    var diff = Math.round(copy[index + 11].MonthlyIncome) - Math.round(copy[index].MonthlyIncome);
                    if (diff === 0)
                        continue;
                    this.incomeRange.push({ value: Math.round(copy[index].MonthlyIncome), step: diff })
                    this.capitalRange.push({ value: Math.round(copy[index].Capital), step: Math.round(copy[index + 11].Capital) - Math.round(copy[index].Capital) })
                }
            }
        }
        else {
            for (var index = 1; index < copy.length - 1; index++) {

                this.incomeRange.push({ value: Math.round(copy[index].MonthlyIncome), step: Math.round(copy[index + 1].MonthlyIncome) - Math.round(copy[index].MonthlyIncome) })
                this.capitalRange.push({ value: Math.round(copy[index].Capital), step: Math.round(copy[index + 1].Capital) - Math.round(copy[index].Capital) })
            }
        }
        this.capitalRange.push({ value: Math.round(copy[copy.length - 1].Capital) })
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

        let capital;

        if (this.isInflationSelected === true) {
            capital = Math.round(filteredArray[0].CapitalWithInflation);
        }
        else {
            capital = Math.round(filteredArray[0].Capital);
        }

        this.selectedCapital = capital;
        this.selectedYear = filteredArray[0].Year;
        this.selectedSpendAmount = this.calcMonthlySpend(this.selectedCapital);
    }
    @action
    updateLiveByAge(age) {
        this.selectedLiveAge = age;
        this.selectedSpendAmount = this.calcMonthlySpend(this.selectedCapital);
    }

    @action
    updateByIncome(income) {
        var copy = toJS(this.incomesByAges);
        var cc = this.closest(income, copy);
        this.selectedAge = cc.Age;
        this.selectedIncome = Math.round(cc.MonthlyIncome);
        this.selectedCapital = Math.round(cc.Capital)
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
        const params = {
            age: this.selectedAge,
            SpendCapital: this.spendCapital,
            CalcWithInflation: this.isInflationSelected,
            SpendTillAge: this.selectedLiveAge,
        };
        var saveRes = saveAim(params);
        return saveRes;

    }

    @action
    toggleUseInflation() {
        this.isInflationSelected = !this.isInflationSelected;
        this.updateByAge(this.selectedAge);
    }


}