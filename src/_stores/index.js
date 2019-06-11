import { regComp } from 'bs_react_lib/utils/bsDI';
import ClientInfoStore from './ClientInfoStore';
import QuestionFormStore from './QuestionFromStore';
import CalcStore from './CalcStore';
import LoginStore from './LoginStore';
import PasswordRecoveryStore from '../PasswordRecoveryPage/PasswordRecoveryStore';
import UserProfileStore from './UserProfileStore'
import CommonStore from './CommonStore';
import FinanceInputStore from './FinanceInputStore';
import BudgetInputStore from './BudgetInputStore';
import RecommendationStore from './RecommendationsStore';
import ReserveFundRecStore from './ReserveFundRecStore';


regComp(ClientInfoStore, 'ClientInfoStore', true);
regComp(QuestionFormStore, 'QuestionFormStore', true);
regComp(CalcStore, 'CalcStore', true);
regComp(LoginStore, 'LoginStore', true);
regComp(PasswordRecoveryStore, 'PasswordRecoveryStore', true);
regComp(UserProfileStore, 'UserProfileStore', true);
regComp(CommonStore, 'CommonStore', true);
regComp(FinanceInputStore, 'FinanceInputStore', true);
regComp(BudgetInputStore, 'BudgetInputStore', true)
regComp(RecommendationStore,'RecommendationStore',true);
regComp(ReserveFundRecStore,'ReserveFundRecStore',true);

