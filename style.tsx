import {Dimensions, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  // SplashScreen
  SplshView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SplshImg: {height: 150, width: 150},
  ContentView: {
    marginTop: 85,
    alignItems: 'center',
    height: 'auto',
    flex: 1,
  },
  ContentViewHome: {
    alignItems: 'center',
    height: 'auto',
    backgroundColor: '#fff',
  },
  ContentViewHomeChild: {
    backgroundColor: '#fff',
    height: '100%',
    margin: '50%',
    verticalAlign: 'middle',
  },
  TableLoading: {height: '100%', margin: '25%', verticalAlign: 'middle'},
  Footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  FooterText: {
    color: '#616161',
    fontWeight: '500',
  },
  FooterBrand: {
    color: '#1EC677',
  },
  ContentViewForm: {
    marginTop: 100,
    alignItems: 'center',
  },

  formView: {
    alignItems: 'center',
    marginTop: '20%',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
    marginHorizontal: 45,
  },
  deviderDash: {
    flex: 1,
    height: 1,
    backgroundColor: '#cccccc',
    // marginHorizontal: 32,
  },
  logo: {
    height: 80,
    width: 80,
  },
  hImage: {
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 0,
    marginBottom: 32,
    color: '#1EC677',
    // textAlign: 'justify',
  },
  brand: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 0,
    marginBottom: 8,
    color: '#1EC677',
    letterSpacing: 1,
  },
  textSub: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
    color: '#616161',
    marginHorizontal: 5,
  },
  textOr: {
    letterSpacing: 1.6,
    color: '#828282',
    fontSize: 12,
    marginHorizontal: 8,
    fontWeight: '900',
  },
  seperator: {
    marginVertical: 10,
  },
  buttonMobile: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 312,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#1ec677',
    marginVertical: 20,
    // padding: 18,
    height: 57.59,
    borderColor: '#1ec677',
  },
  googleText: {
    textAlign: 'center',
    paddingBottom: 12,
    fontWeight: 'bold',
    paddingTop: 12,
    marginHorizontal: 18,
  },
  mobileText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '900',
    color: '#ffffff',
    marginHorizontal: 18,
    letterSpacing: 1,
    marginVertical: 18,
  },
  googleImage: {
    padding: 15,
    margin: 15,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  buttonG: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputMob: {
    padding: 20,
    width: 312,
    fontSize: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 20,
    verticalAlign: 'middle',
    marginHorizontal: 'auto',
    fontWeight: '500',
  },

  inputPass: {
    padding: 20,
    width: 312,
    fontSize: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    verticalAlign: 'middle',
    marginHorizontal: 'auto',
    fontWeight: '500',
  },
  buttonLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 312,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginVertical: 20,
    // padding: 18,
    height: 57.59,
    borderEndColor: '#4285F4',
    borderBottomColor: '#34A853',
    borderStartColor: '#FBBC05',
    borderTopColor: '#EA4335',
  },
  buttonLogout: {
    width: 312,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#808080',
    backgroundColor: '#ffffff',
    // marginVertical: 20,
    padding: 18,
    height: 57.59,
    // verticalAlign: 'middle',
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
  },
  StyleIndicator: {
    transform: [{scaleX: 3}, {scaleY: 3}],
  },
  logoutTextHead: {
    fontSize: 18,
    verticalAlign: 'middle',
    textAlign: 'center',
    fontWeight: '900',
    color: '#696969',
    marginHorizontal: 18,
    letterSpacing: 1,
    marginBottom: 35,
  },
  loginText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '900',
    color: '#6a6a6a',
    marginHorizontal: 18,
    letterSpacing: 1,
    marginVertical: 18,
  },
  logoutText: {
    fontSize: 16,
    verticalAlign: 'middle',
    textAlign: 'center',
    fontWeight: '900',
    color: '#808080',
    marginHorizontal: 18,
    letterSpacing: 1,
  },
  textOTP: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
    color: '#6b7280',
    // textAlignVertical: 'center',
    textAlign: 'center',
  },
  link: {
    color: '#20509e',
    fontWeight: '600',
  },
  keyBoard: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  errorMsg: {
    color: '#dc3545',
    // marginBottom: 10,
    marginTop: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
    marginVertical: 15,
  },
  logoutCont: {
    flex: 1,
    marginTop: '50%',
  },
  // ADD BY FIGMA
  transactionsLayout: {
    height: 245,
    width: 375,
    left: 0,
    position: 'absolute',
  },
  iconLayout: {
    maxHeight: '100%',
    maxWidth: '100%',
    position: 'absolute',
    overflow: 'hidden',
  },
  timePosition: {
    left: '0%',
    top: '0%',
    position: 'absolute',
  },
  text11Typo1: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
  },
  yourTypo: {
    fontSize: 22,
    // position: 'absolute',
  },
  text11Typo: {
    fontSize: 20,
    color: '#fff',
    position: 'absolute',
  },
  cardsLayout: {
    height: 541,
    width: 375,
  },
  cardsChildPosition: {
    bottom: 0,
    position: 'absolute',
  },
  searchTypo: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    position: 'absolute',
  },
  sportsPosition: {
    height: 48,
    left: 0,
    position: 'absolute',
  },
  groupParentPosition: {
    height: 41,
    left: 56,
    top: 4,
    position: 'absolute',
  },
  textTypo1: {
    textAlign: 'right',
    fontSize: 16,
    top: 15,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    position: 'absolute',
  },
  smallLayout: {
    height: 12,
    width: 7,
    position: 'absolute',
    overflow: 'hidden',
  },
  travelLayout: {
    height: 103,
    width: 153,
    position: 'absolute',
  },
  childBg: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    top: 0,
  },
  text18Position: {
    color: '#a73131',
    left: 16,
    textAlign: 'left',
    position: 'absolute',
  },
  textTypo: {
    fontSize: 24,
    top: 54,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
  },
  text19Position: {
    color: '#298693',
    left: 16,
    textAlign: 'left',
    position: 'absolute',
  },
  medicine2Position: {
    left: 190,
    height: 103,
    width: 153,
    position: 'absolute',
  },
  text20Position: {
    color: '#9137bc',
    left: 16,
    textAlign: 'left',
    position: 'absolute',
  },
  text21Position: {
    color: '#a27430',
    left: 16,
    textAlign: 'left',
    position: 'absolute',
  },
  creditCardPosition: {
    height: 105,
    marginLeft: -157.5,
    width: 315,
    left: '50%',
    position: 'absolute',
  },
  transactionsDetailsChild: {
    top: 5,
  },
  transactionsDetailsItem: {
    top: 0,
  },
  batteryIcon1: {
    height: '62.96%',
    width: '7.41%',
    top: '24.07%',
    right: '0%',
    bottom: '12.96%',
    left: '92.59%',
  },
  wifiIcon1: {
    height: '61.11%',
    width: '4.67%',
    top: '24.06%',
    right: '8.94%',
    bottom: '14.83%',
    left: '86.39%',
  },
  cellularConnectionIcon1: {
    height: '59.26%',
    width: '5.18%',
    top: '25.93%',
    right: '15.13%',
    bottom: '14.82%',
    left: '79.69%',
  },
  time: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    textAlign: 'left',
    color: '#fff',
  },
  barsStatusBarIphoneX: {
    width: '9.14%',
    right: '90.86%',
    bottom: '0%',
    left: '0%',
    height: '100%',
  },
  barsStatusBarIphoneD: {
    height: '40.91%',
    width: '87.28%',
    top: '29.55%',
    right: '4.08%',
    bottom: '29.55%',
    left: '8.64%',
    position: 'absolute',
  },
  dark1: {
    marginLeft: -187.5,
    width: 376,
    height: 44,
    left: '50%',
    top: 0,
    position: 'absolute',
    overflow: 'hidden',
  },
  transactions: {
    left: '48.42%',
    fontSize: 17,
    textAlign: 'center',
    color: '#fff',
    top: '0%',
    fontWeight: '700',
    position: 'absolute',
  },
  icon: {
    height: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  leftArrow1: {
    right: '88.24%',
    width: '11.76%',
    bottom: '0%',
    left: '0%',
    height: '100%',
  },
  navigationBar: {
    left: 24,
    width: 221,
    height: 21,
    top: 47,
    position: 'absolute',
  },
  yourTotalExpenses1: {
    marginLeft: -107.5,
    top: 138,
    color: '#87f0ff',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    left: '50%',
  },
  text11: {
    marginLeft: -52.5,
    top: 181,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    left: '50%',
  },
  cardsChild: {
    height: 541,
    width: 375,
    left: 0,
  },
  searchBarChild: {
    borderRadius: 16,
    backgroundColor: '#05199e',
    marginLeft: -157.5,
    height: 53,
    width: 315,
    left: '50%',
    top: 0,
    position: 'absolute',
  },
  search1Icon1: {
    width: 22,
    left: 16,
    top: 16,
    height: 21,
    position: 'absolute',
    overflow: 'hidden',
  },
  search: {
    left: 46,
    color: '#3d56fa',
    top: 16,
    textAlign: 'center',
  },
  searchBar: {
    marginLeft: -158.5,
    top: 44,
    height: 53,
    width: 315,
    left: '50%',
    position: 'absolute',
  },
  shopping1: {
    textAlign: 'left',
    color: '#fff',
    top: 0,
    left: 0,
  },
  thNov21034: {
    top: 26,
    fontSize: 12,
    color: '#80e0ff',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'left',
    left: 0,
    position: 'absolute',
  },
  shoppingParent: {
    width: 136,
  },
  text12: {
    left: 238,
  },
  shoppingIcon6: {
    width: 48,
    top: 0,
  },
  smallArrow36: {
    top: 825,
    left: 339,
  },
  shopping: {
    width: 315,
    top: 0,
  },
  shoppingGroup: {
    width: 128,
  },
  smallArrow37: {
    top: 19,
    left: 308,
  },
  shopping2: {
    top: 192,
    width: 315,
  },
  travelParent: {
    width: 126,
  },
  text14: {
    left: 235,
  },
  travel1Icon1: {
    top: 12,
    left: 12,
    width: 24,
    height: 24,
    position: 'absolute',
    overflow: 'hidden',
  },
  travel: {
    top: 256,
    width: 315,
  },
  medicineParent: {
    width: 135,
  },
  text15: {
    left: 244,
  },
  medicine: {
    top: 64,
    width: 315,
  },
  text16: {
    left: 246,
  },
  sport1Icon2: {
    left: 10,
    width: 28,
    height: 16,
    top: 16,
    position: 'absolute',
    overflow: 'hidden',
  },
  sports: {
    top: 128,
    width: 315,
  },
  sportsGroup: {
    width: 139,
  },
  text17: {
    left: 250,
  },
  sports2: {
    top: 320,
    width: 315,
  },
  transactions1: {
    top: 113,
    height: 368,

    width: 315,
    position: 'absolute',
  },
  cardsItem: {
    marginLeft: -24.5,
    borderRadius: 4,
    width: 47,
    height: 4,
    top: 16,
    left: '50%',
    position: 'absolute',
    backgroundColor: '#fff',
  },
  cards: {
    bottom: -422,
    left: 1,
    position: 'absolute',
  },
  darkPortrait11: {
    marginLeft: -66.5,
    width: 134,
    height: 34,
    left: '50%',
    overflow: 'hidden',
  },
  trackYourExpenses1: {
    top: 20,
    color: '#3a3a3a',
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    textAlign: 'center',
  },
  travelChild: {
    height: 103,
    width: 153,
    position: 'absolute',
    left: 0,
  },
  maskGroupIcon: {
    top: 0,
    left: 0,
  },
  travel3: {
    top: 24,
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
  },
  text18: {
    color: '#a73131',
    left: 16,
    textAlign: 'left',
    position: 'absolute',
  },
  travel2: {
    top: 89,
  },
  sports5: {
    top: 24,
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
  },
  text19: {
    fontSize: 24,
    top: 54,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
  },
  sports4: {
    top: 210,
  },
  medicine3: {
    top: 24,
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
  },
  text20: {
    fontSize: 24,
    top: 54,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
  },
  medicine2: {
    top: 210,
  },
  shopping5: {
    top: 24,
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
  },
  text21: {
    fontSize: 24,
    top: 54,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
  },
  shopping4: {
    top: 89,
  },
  creditCardRepaymentChild: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    top: 0,
  },
  maskGroupIcon4: {
    top: 0,
  },
  creditCardRepayment3: {
    top: 29,
    left: 32,
    width: 156,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'left',
  },
  smallArrow11: {
    left: 276,
    top: 47,
    height: 12,
    width: 7,
  },
  creditCardRepayment2: {
    top: 577,
  },
  transactionsDetails: {
    flex: 1,
    height: 812,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#fff',
  },
  padView: {
    marginHorizontal: 25,
  },
  // Add By Custome
  homeGridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  homeGridView2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginHorizontal: 20,
  },
  homeGridView3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  viewElements: {
    margin: 5,
    width: '100%',
    height: 'auto',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewElementsP: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'green',
  },
  viewElementsInnerF1: {
    marginHorizontal: 10,
  },
  viewElementsInnerF2: {
    marginHorizontal: 15,
    textAlign: 'center',
  },
  viewElementsInnerText: {
    color: '#262626',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 0.5,
    width: '100%',
  },
  viewElementsInnerP: {marginHorizontal: 8},
  innerTextView: {
    fontSize: 18,
    fontWeight: '700',
    color: '#404040',
    letterSpacing: 1.5,
  },
  innerTextViewHead: {
    paddingBottom: 5,
    fontWeight: '500',
  },
  IconView: {
    padding: 8,
    borderRadius: 50,
  },
  IconViewEnI: {
    padding: 6,
    borderRadius: 50,
    height: 'auto',
    width: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    marginVertical: 10,
  },
  cardE: {
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
    marginLeft: '2%',
  },
  cardI: {
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: '2%',
  },
  homeGridViewPie: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  PieC: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '100%',
  },
  PieHead: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 5,
  },
  elevationPro: {
    elevation: 5,
    shadowColor: '#8c8c8c',
  },
  ChartStyle: {
    marginVertical: 10,
    borderRadius: 16,
    width: '100%',
  },
  // Report screen
  ContentViewReport: {
    height: '100%',
    backgroundColor: '#fdfcfc',
  },
  reportGridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 25,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  reportGridView2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cardIReport: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: '3%',
    height: 165,
  },
  cardEReport: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
    marginLeft: '3%',
    height: 165,
  },
  cardIReportDue: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
    height: 165,
  },
  elevationProReport: {
    elevation: 8,
    shadowColor: '#737373',
  },
  viewElementsReport: {
    margin: 5,
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  viewElementsReportF2: {
    textAlign: 'center',
    marginTop: 30,
  },
  reportHead: {
    fontSize: 25,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: '2%',
    fontWeight: '700',
    color: '#1266f1',
  },
  innerTextViewRe: {
    fontSize: 18,
    fontWeight: '700',
    color: '#404040',
    letterSpacing: 1,
    paddingBottom: 5,
  },
  innerTextViewHeadRe: {
    paddingBottom: 5,
    fontWeight: '500',
  },
  datePicker: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 18,
  },
  errorMsgRe: {
    color: '#dc3545',
    marginTop: 15,
    marginBottom: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
    marginVertical: 15,
  },
  buttonReport: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#e5e7eb',
    backgroundColor: '#39c0ed',
    marginVertical: 20,
    padding: 18,
    height: 57.59,
  },
  viewTable: {
    marginHorizontal: '4%',
  },
  viewTableData: {
    borderBottomColor: '#dee2e6',
    borderTopColor: '#dee2e6',
    borderRightColor: '#dee2e6',
    borderStartColor: '#dee2e6',
    borderWidth: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  tableTD: {
    height: '63%',
    // marginBottom: '5%',
  },
  item: {
    width: '20%',
    textAlign: 'center',
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: '#dee2e6',
    borderStartColor: '#dee2e6',
    fontWeight: '400',
    color: '#212529',
  },
  viewTableHead: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderBottomColor: '#7abaff',
    borderTopColor: '#7abaff',
    borderRightColor: '#7abaff',
    borderStartColor: '#7abaff',
    borderWidth: 2,
  },
  tableTDHead: {
    marginHorizontal: '4%',
    marginBottom: 5,
    backgroundColor: '#c6d5ef',
  },
  itemHead: {
    width: '20%',
    textAlign: 'center',
    borderRightWidth: 2,
    borderRightColor: '#7abaff',
    borderStartColor: '#7abaff',
    padding: 4,
    fontWeight: '700',
    color: '#000',
  },
  itemHeadAll: {
    width: '100%',
    textAlign: 'center',
    borderRightColor: '#F78CA2',
    borderStartColor: '#F78CA2',
    padding: 4,
    fontWeight: '900',
    color: '#D82148',
  },
  tableTDHeadErr: {
    marginHorizontal: '4%',
    marginBottom: 5,
    backgroundColor: '#FFBBBB',
  },
  viewTableHeadErr: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderBottomColor: '#F78CA2',
    borderTopColor: '#F78CA2',
    borderRightColor: '#F78CA2',
    borderStartColor: '#F78CA2',
    borderWidth: 2,
  },
  selectField: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  select1: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginRight: '3%',
  },
  select2: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginLeft: '3%',
  },
  select3: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginTop: '3%',
  },
  dropdown: {
    fontWeight: '900',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  placeholderStyle: {
    fontWeight: '900',
  },
  selectedTextStyle: {
    color: '#ff0000',
    padding: 8,
  },
  inputSearchStyle: {
    color: '#1266f1',
    paddingHorizontal: 8,
  },
  profilePic: {
    width: 55,
    height: 55,
    borderRadius: 150,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#1ec677',
  },
  profileImgContainer: {
    alignItems: 'center',
  },
  ProfileName: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#1ec677',
    paddingVertical: '5%',
    // marginVertical: '15%',
  },
});

export default styles;