"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const pagination = require("./pagination.cjs");
const dialog = require("./dialog.cjs");
const autocomplete = require("./autocomplete.cjs");
const dropdown = require("./dropdown.cjs");
const dropdownMenu = require("./dropdown-menu.cjs");
const dropdownItem = require("./dropdown-item.cjs");
const menu = require("./menu.cjs");
const submenu = require("./submenu.cjs");
const menuItem = require("./menu-item.cjs");
const menuItemGroup = require("./menu-item-group.cjs");
const input = require("./input.cjs");
const inputNumber = require("./input-number.cjs");
const radio = require("./radio.cjs");
const radioGroup = require("./radio-group.cjs");
const radioButton = require("./radio-button.cjs");
const checkbox = require("./checkbox.cjs");
const checkboxButton = require("./checkbox-button.cjs");
const checkboxGroup = require("./checkbox-group.cjs");
const _switch = require("./switch.cjs");
const select = require("./select.cjs");
require("./option.cjs");
const optionGroup = require("./option-group.cjs");
const button = require("./button.cjs");
const buttonGroup = require("./button-group.cjs");
const table = require("./table.cjs");
const tableColumn = require("./table-column.cjs");
const datePicker = require("./date-picker.cjs");
const timeSelect = require("./time-select.cjs");
const timePicker = require("./time-picker.cjs");
const popover = require("./popover.cjs");
const tooltip = require("./tooltip.cjs");
const main = require("./main-CN7LpE4i.cjs");
const breadcrumb = require("./breadcrumb.cjs");
const breadcrumbItem = require("./breadcrumb-item.cjs");
const form = require("./form.cjs");
const formItem = require("./form-item.cjs");
const tabs = require("./tabs.cjs");
const tabPane = require("./tab-pane.cjs");
const tag = require("./tag.cjs");
const tree = require("./tree.cjs");
const alert = require("./alert.cjs");
const main$1 = require("./main-rBS_om8E.cjs");
const slider = require("./slider.cjs");
const loading = require("./loading.cjs");
const icon = require("./icon.cjs");
const row = require("./row.cjs");
const col = require("./col.cjs");
const upload = require("./upload.cjs");
const progress = require("./progress.cjs");
const spinner = require("./spinner.cjs");
const main$2 = require("./main-B9HzhGwi.cjs");
const badge = require("./badge.cjs");
const card = require("./card.cjs");
const rate = require("./rate.cjs");
const steps = require("./steps.cjs");
const step = require("./step.cjs");
const carousel = require("./carousel.cjs");
const scrollbar = require("./scrollbar.cjs");
const carouselItem = require("./carousel-item.cjs");
const collapse = require("./collapse.cjs");
const collapseItem = require("./collapse-item.cjs");
const cascader = require("./cascader.cjs");
const colorPicker = require("./color-picker.cjs");
const transfer = require("./transfer.cjs");
const container = require("./container.cjs");
const header = require("./header.cjs");
const aside = require("./aside.cjs");
const main$3 = require("./main.cjs");
const footer = require("./footer.cjs");
const timeline = require("./timeline.cjs");
const timelineItem = require("./timeline-item.cjs");
const link = require("./link.cjs");
const divider = require("./divider.cjs");
const image = require("./image.cjs");
const calendar = require("./calendar.cjs");
const backtop = require("./backtop.cjs");
const infiniteScroll = require("./infinite-scroll.cjs");
const pageHeader = require("./page-header.cjs");
const cascaderPanel = require("./cascader-panel.cjs");
const avatar = require("./avatar.cjs");
const drawer = require("./drawer.cjs");
const statistic = require("./statistic.cjs");
const popconfirm = require("./popconfirm.cjs");
const skeleton = require("./skeleton.cjs");
const skeletonItem = require("./skeleton-item.cjs");
const empty = require("./empty.cjs");
const descriptions = require("./descriptions.cjs");
const descriptionsItem = require("./descriptions-item.cjs");
const result = require("./result.cjs");
const locale = require("element-ui/lib/locale");
const ElCollapseTransition = require("element-ui/lib/transitions/collapse-transition");
const option = require("./option-BF4jhUO9.cjs");
const components = [
  pagination,
  dialog,
  autocomplete,
  dropdown,
  dropdownMenu,
  dropdownItem,
  menu,
  submenu,
  menuItem,
  menuItemGroup,
  input,
  inputNumber,
  radio,
  radioGroup,
  radioButton,
  checkbox,
  checkboxButton,
  checkboxGroup,
  _switch,
  select,
  option.ElOption,
  optionGroup,
  button,
  buttonGroup,
  table,
  tableColumn,
  datePicker,
  timeSelect,
  timePicker,
  popover,
  tooltip,
  breadcrumb,
  breadcrumbItem,
  form,
  formItem,
  tabs,
  tabPane,
  tag,
  tree,
  alert,
  slider,
  icon,
  row,
  col,
  upload,
  progress,
  spinner,
  badge,
  card,
  rate,
  steps,
  step,
  carousel,
  scrollbar,
  carouselItem,
  collapse,
  collapseItem,
  cascader,
  colorPicker,
  transfer,
  container,
  header,
  aside,
  main$3,
  footer,
  timeline,
  timelineItem,
  link,
  divider,
  image,
  calendar,
  backtop,
  pageHeader,
  cascaderPanel,
  avatar,
  drawer,
  statistic,
  popconfirm,
  skeleton,
  skeletonItem,
  empty,
  descriptions,
  descriptionsItem,
  result,
  ElCollapseTransition
];
const install = function(Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  Vue.use(infiniteScroll);
  Vue.use(loading.directive);
  Vue.prototype.$ELEMENT = {
    size: opts.size || "",
    zIndex: opts.zIndex || 2e3
  };
  Vue.prototype.$loading = loading.service;
  Vue.prototype.$msgbox = main.MessageBox;
  Vue.prototype.$alert = main.MessageBox.alert;
  Vue.prototype.$confirm = main.MessageBox.confirm;
  Vue.prototype.$prompt = main.MessageBox.prompt;
  Vue.prototype.$notify = main$1.Notification;
  Vue.prototype.$message = main$2.Message;
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
const index = {
  version: "3.0.3",
  locale: locale.use,
  i18n: locale.i18n,
  install,
  CollapseTransition: ElCollapseTransition,
  Loading: loading,
  Pagination: pagination,
  Dialog: dialog,
  Autocomplete: autocomplete,
  Dropdown: dropdown,
  DropdownMenu: dropdownMenu,
  DropdownItem: dropdownItem,
  Menu: menu,
  Submenu: submenu,
  MenuItem: menuItem,
  MenuItemGroup: menuItemGroup,
  Input: input,
  InputNumber: inputNumber,
  Radio: radio,
  RadioGroup: radioGroup,
  RadioButton: radioButton,
  Checkbox: checkbox,
  CheckboxButton: checkboxButton,
  CheckboxGroup: checkboxGroup,
  Switch: _switch,
  Select: select,
  Option: option.ElOption,
  OptionGroup: optionGroup,
  Button: button,
  ButtonGroup: buttonGroup,
  Table: table,
  TableColumn: tableColumn,
  DatePicker: datePicker,
  TimeSelect: timeSelect,
  TimePicker: timePicker,
  Popover: popover,
  Tooltip: tooltip,
  MessageBox: main.MessageBox,
  Breadcrumb: breadcrumb,
  BreadcrumbItem: breadcrumbItem,
  Form: form,
  FormItem: formItem,
  Tabs: tabs,
  TabPane: tabPane,
  Tag: tag,
  Tree: tree,
  Alert: alert,
  Notification: main$1.Notification,
  Slider: slider,
  Icon: icon,
  Row: row,
  Col: col,
  Upload: upload,
  Progress: progress,
  Spinner: spinner,
  Message: main$2.Message,
  Badge: badge,
  Card: card,
  Rate: rate,
  Steps: steps,
  Step: step,
  Carousel: carousel,
  Scrollbar: scrollbar,
  CarouselItem: carouselItem,
  Collapse: collapse,
  CollapseItem: collapseItem,
  Cascader: cascader,
  ColorPicker: colorPicker,
  Transfer: transfer,
  Container: container,
  Header: header,
  Aside: aside,
  Main: main$3,
  Footer: footer,
  Timeline: timeline,
  TimelineItem: timelineItem,
  Link: link,
  Divider: divider,
  Image: image,
  Calendar: calendar,
  Backtop: backtop,
  InfiniteScroll: infiniteScroll,
  PageHeader: pageHeader,
  CascaderPanel: cascaderPanel,
  Avatar: avatar,
  Drawer: drawer,
  Statistic: statistic,
  Popconfirm: popconfirm,
  Skeleton: skeleton,
  SkeletonItem: skeletonItem,
  Empty: empty,
  Descriptions: descriptions,
  DescriptionsItem: descriptionsItem,
  Result: result
};
exports.Pagination = pagination;
exports.Dialog = dialog;
exports.Autocomplete = autocomplete;
exports.Dropdown = dropdown;
exports.DropdownMenu = dropdownMenu;
exports.DropdownItem = dropdownItem;
exports.Menu = menu;
exports.Submenu = submenu;
exports.MenuItem = menuItem;
exports.MenuItemGroup = menuItemGroup;
exports.Input = input;
exports.InputNumber = inputNumber;
exports.Radio = radio;
exports.RadioGroup = radioGroup;
exports.RadioButton = radioButton;
exports.Checkbox = checkbox;
exports.CheckboxButton = checkboxButton;
exports.CheckboxGroup = checkboxGroup;
exports.Switch = _switch;
exports.Select = select;
exports.OptionGroup = optionGroup;
exports.Button = button;
exports.ButtonGroup = buttonGroup;
exports.Table = table;
exports.TableColumn = tableColumn;
exports.DatePicker = datePicker;
exports.TimeSelect = timeSelect;
exports.TimePicker = timePicker;
exports.Popover = popover;
exports.Tooltip = tooltip;
exports.MessageBox = main.MessageBox;
exports.Breadcrumb = breadcrumb;
exports.BreadcrumbItem = breadcrumbItem;
exports.Form = form;
exports.FormItem = formItem;
exports.Tabs = tabs;
exports.TabPane = tabPane;
exports.Tag = tag;
exports.Tree = tree;
exports.Alert = alert;
exports.Notification = main$1.Notification;
exports.Slider = slider;
exports.Loading = loading;
exports.Icon = icon;
exports.Row = row;
exports.Col = col;
exports.Upload = upload;
exports.Progress = progress;
exports.Spinner = spinner;
exports.Message = main$2.Message;
exports.Badge = badge;
exports.Card = card;
exports.Rate = rate;
exports.Steps = steps;
exports.Step = step;
exports.Carousel = carousel;
exports.Scrollbar = scrollbar;
exports.CarouselItem = carouselItem;
exports.Collapse = collapse;
exports.CollapseItem = collapseItem;
exports.Cascader = cascader;
exports.ColorPicker = colorPicker;
exports.Transfer = transfer;
exports.Container = container;
exports.Header = header;
exports.Aside = aside;
exports.Main = main$3;
exports.Footer = footer;
exports.Timeline = timeline;
exports.TimelineItem = timelineItem;
exports.Link = link;
exports.Divider = divider;
exports.Image = image;
exports.Calendar = calendar;
exports.Backtop = backtop;
exports.InfiniteScroll = infiniteScroll;
exports.PageHeader = pageHeader;
exports.CascaderPanel = cascaderPanel;
exports.Avatar = avatar;
exports.Drawer = drawer;
exports.Statistic = statistic;
exports.Popconfirm = popconfirm;
exports.Skeleton = skeleton;
exports.SkeletonItem = skeletonItem;
exports.Empty = empty;
exports.Descriptions = descriptions;
exports.DescriptionsItem = descriptionsItem;
exports.Result = result;
exports.CollapseTransition = ElCollapseTransition;
exports.Option = option.ElOption;
exports.default = index;
