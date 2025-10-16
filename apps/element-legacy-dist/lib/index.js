import _Pagination from "./pagination.js";
import _ElDialog from "./dialog.js";
import _Autocomplete from "./autocomplete.js";
import _ElDropdown from "./dropdown.js";
import _ElDropdownMenu from "./dropdown-menu.js";
import _ElDropdownItem from "./dropdown-item.js";
import _ElMenu from "./menu.js";
import _ElSubmenu from "./submenu.js";
import _ElMenuItem from "./menu-item.js";
import _ElMenuItemGroup from "./menu-item-group.js";
import _ElInput from "./input.js";
import _ElInputNumber from "./input-number.js";
import _Radio from "./radio.js";
import _RadioGroup from "./radio-group.js";
import _RadioButton from "./radio-button.js";
import _Checkbox from "./checkbox.js";
import _CheckboxButton from "./checkbox-button.js";
import _CheckboxGroup from "./checkbox-group.js";
import _Switch from "./switch.js";
import _Select from "./select.js";
import _ElOption from "./option.js";
import _ElOptionGroup from "./option-group.js";
import _Button from "./button.js";
import _ButtonGroup from "./button-group.js";
import _ElTable from "./table.js";
import _ElTableColumn from "./table-column.js";
import _DatePicker from "./date-picker.js";
import _DatePickerV2 from "./date-picker-v2.js";
import _TimeSelect from "./time-select.js";
import _TimePicker from "./time-picker.js";
import _Popover from "./popover.js";
import _Tooltip from "./tooltip.js";
import { M as MessageBox } from "./main-CO0p3cHT.js";
import _Breadcrumb from "./breadcrumb.js";
import _BreadcrumbItem from "./breadcrumb-item.js";
import _ElForm from "./form.js";
import _ElFormItem from "./form-item.js";
import _ElTabs from "./tabs.js";
import _TabPane from "./tab-pane.js";
import _ElTag from "./tag.js";
import _Tree from "./tree.js";
import _Alert from "./alert.js";
import { N as Notification } from "./main-WgeW2pMY.js";
import _Slider from "./slider.js";
import Loading from "./loading.js";
import _ElIcon from "./icon.js";
import _Row from "./row.js";
import _Col from "./col.js";
import _Upload from "./upload.js";
import _ElProgress from "./progress.js";
import _Spinner from "./spinner.js";
import { M as Message } from "./main-DX0lm7RT.js";
import _Badge from "./badge.js";
import _Card from "./card.js";
import _Rate from "./rate.js";
import _Steps from "./steps.js";
import _Step from "./step.js";
import _Carousel from "./carousel.js";
import _Scrollbar from "./scrollbar.js";
import _CarouselItem from "./carousel-item.js";
import _Collapse from "./collapse.js";
import _CollapseItem from "./collapse-item.js";
import _Cascader from "./cascader.js";
import _ColorPicker from "./color-picker.js";
import _Transfer from "./transfer.js";
import _Container from "./container.js";
import _Header from "./header.js";
import _Aside from "./aside.js";
import _Main from "./main.js";
import _Footer from "./footer.js";
import _Timeline from "./timeline.js";
import _ElTimelineItem from "./timeline-item.js";
import _Link from "./link.js";
import _Divider from "./divider.js";
import _Image from "./image.js";
import _Calendar from "./calendar.js";
import _Backtop from "./backtop.js";
import _InfiniteScroll from "./infinite-scroll.js";
import _PageHeader from "./page-header.js";
import _CascaderPanel from "./cascader-panel.js";
import _Avatar from "./avatar.js";
import _Drawer from "./drawer.js";
import _Statistic from "./statistic.js";
import _Popconfirm from "./popconfirm.js";
import _Skeleton from "./skeleton.js";
import _SkeletonItem from "./skeleton-item.js";
import _Empty from "./empty.js";
import _Descriptions from "./descriptions.js";
import _DescriptionsItem from "./descriptions-item.js";
import _Result from "./result.js";
import locale from "element-ui/lib/locale";
import { C as CollapseTransition } from "./collapse-transition-Bb8-smf9.js";
const components = [
  _Pagination,
  _ElDialog,
  _Autocomplete,
  _ElDropdown,
  _ElDropdownMenu,
  _ElDropdownItem,
  _ElMenu,
  _ElSubmenu,
  _ElMenuItem,
  _ElMenuItemGroup,
  _ElInput,
  _ElInputNumber,
  _Radio,
  _RadioGroup,
  _RadioButton,
  _Checkbox,
  _CheckboxButton,
  _CheckboxGroup,
  _Switch,
  _Select,
  _ElOption,
  _ElOptionGroup,
  _Button,
  _ButtonGroup,
  _ElTable,
  _ElTableColumn,
  _DatePicker,
  _DatePickerV2,
  _TimeSelect,
  _TimePicker,
  _Popover,
  _Tooltip,
  _Breadcrumb,
  _BreadcrumbItem,
  _ElForm,
  _ElFormItem,
  _ElTabs,
  _TabPane,
  _ElTag,
  _Tree,
  _Alert,
  _Slider,
  _ElIcon,
  _Row,
  _Col,
  _Upload,
  _ElProgress,
  _Spinner,
  _Badge,
  _Card,
  _Rate,
  _Steps,
  _Step,
  _Carousel,
  _Scrollbar,
  _CarouselItem,
  _Collapse,
  _CollapseItem,
  _Cascader,
  _ColorPicker,
  _Transfer,
  _Container,
  _Header,
  _Aside,
  _Main,
  _Footer,
  _Timeline,
  _ElTimelineItem,
  _Link,
  _Divider,
  _Image,
  _Calendar,
  _Backtop,
  _PageHeader,
  _CascaderPanel,
  _Avatar,
  _Drawer,
  _Statistic,
  _Popconfirm,
  _Skeleton,
  _SkeletonItem,
  _Empty,
  _Descriptions,
  _DescriptionsItem,
  _Result,
  CollapseTransition
];
const install = function(Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  Vue.use(_InfiniteScroll);
  Vue.use(Loading.directive);
  Vue.prototype.$ELEMENT = {
    size: opts.size || "",
    zIndex: opts.zIndex || 2e3
  };
  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
const index = {
  version: "0.0.1",
  locale: locale.use,
  i18n: locale.i18n,
  install,
  CollapseTransition,
  Loading,
  Pagination: _Pagination,
  Dialog: _ElDialog,
  Autocomplete: _Autocomplete,
  Dropdown: _ElDropdown,
  DropdownMenu: _ElDropdownMenu,
  DropdownItem: _ElDropdownItem,
  Menu: _ElMenu,
  Submenu: _ElSubmenu,
  MenuItem: _ElMenuItem,
  MenuItemGroup: _ElMenuItemGroup,
  Input: _ElInput,
  InputNumber: _ElInputNumber,
  Radio: _Radio,
  RadioGroup: _RadioGroup,
  RadioButton: _RadioButton,
  Checkbox: _Checkbox,
  CheckboxButton: _CheckboxButton,
  CheckboxGroup: _CheckboxGroup,
  Switch: _Switch,
  Select: _Select,
  Option: _ElOption,
  OptionGroup: _ElOptionGroup,
  Button: _Button,
  ButtonGroup: _ButtonGroup,
  Table: _ElTable,
  TableColumn: _ElTableColumn,
  DatePicker: _DatePicker,
  DatePickerV2: _DatePickerV2,
  TimeSelect: _TimeSelect,
  TimePicker: _TimePicker,
  Popover: _Popover,
  Tooltip: _Tooltip,
  MessageBox,
  Breadcrumb: _Breadcrumb,
  BreadcrumbItem: _BreadcrumbItem,
  Form: _ElForm,
  FormItem: _ElFormItem,
  Tabs: _ElTabs,
  TabPane: _TabPane,
  Tag: _ElTag,
  Tree: _Tree,
  Alert: _Alert,
  Notification,
  Slider: _Slider,
  Icon: _ElIcon,
  Row: _Row,
  Col: _Col,
  Upload: _Upload,
  Progress: _ElProgress,
  Spinner: _Spinner,
  Message,
  Badge: _Badge,
  Card: _Card,
  Rate: _Rate,
  Steps: _Steps,
  Step: _Step,
  Carousel: _Carousel,
  Scrollbar: _Scrollbar,
  CarouselItem: _CarouselItem,
  Collapse: _Collapse,
  CollapseItem: _CollapseItem,
  Cascader: _Cascader,
  ColorPicker: _ColorPicker,
  Transfer: _Transfer,
  Container: _Container,
  Header: _Header,
  Aside: _Aside,
  Main: _Main,
  Footer: _Footer,
  Timeline: _Timeline,
  TimelineItem: _ElTimelineItem,
  Link: _Link,
  Divider: _Divider,
  Image: _Image,
  Calendar: _Calendar,
  Backtop: _Backtop,
  InfiniteScroll: _InfiniteScroll,
  PageHeader: _PageHeader,
  CascaderPanel: _CascaderPanel,
  Avatar: _Avatar,
  Drawer: _Drawer,
  Statistic: _Statistic,
  Popconfirm: _Popconfirm,
  Skeleton: _Skeleton,
  SkeletonItem: _SkeletonItem,
  Empty: _Empty,
  Descriptions: _Descriptions,
  DescriptionsItem: _DescriptionsItem,
  Result: _Result
};
export {
  _Alert as Alert,
  _Aside as Aside,
  _Autocomplete as Autocomplete,
  _Avatar as Avatar,
  _Backtop as Backtop,
  _Badge as Badge,
  _Breadcrumb as Breadcrumb,
  _BreadcrumbItem as BreadcrumbItem,
  _Button as Button,
  _ButtonGroup as ButtonGroup,
  _Calendar as Calendar,
  _Card as Card,
  _Carousel as Carousel,
  _CarouselItem as CarouselItem,
  _Cascader as Cascader,
  _CascaderPanel as CascaderPanel,
  _Checkbox as Checkbox,
  _CheckboxButton as CheckboxButton,
  _CheckboxGroup as CheckboxGroup,
  _Col as Col,
  _Collapse as Collapse,
  _CollapseItem as CollapseItem,
  CollapseTransition,
  _ColorPicker as ColorPicker,
  _Container as Container,
  _DatePicker as DatePicker,
  _DatePickerV2 as DatePickerV2,
  _Descriptions as Descriptions,
  _DescriptionsItem as DescriptionsItem,
  _ElDialog as Dialog,
  _Divider as Divider,
  _Drawer as Drawer,
  _ElDropdown as Dropdown,
  _ElDropdownItem as DropdownItem,
  _ElDropdownMenu as DropdownMenu,
  _Empty as Empty,
  _Footer as Footer,
  _ElForm as Form,
  _ElFormItem as FormItem,
  _Header as Header,
  _ElIcon as Icon,
  _Image as Image,
  _InfiniteScroll as InfiniteScroll,
  _ElInput as Input,
  _ElInputNumber as InputNumber,
  _Link as Link,
  Loading,
  _Main as Main,
  _ElMenu as Menu,
  _ElMenuItem as MenuItem,
  _ElMenuItemGroup as MenuItemGroup,
  Message,
  MessageBox,
  Notification,
  _ElOption as Option,
  _ElOptionGroup as OptionGroup,
  _PageHeader as PageHeader,
  _Pagination as Pagination,
  _Popconfirm as Popconfirm,
  _Popover as Popover,
  _ElProgress as Progress,
  _Radio as Radio,
  _RadioButton as RadioButton,
  _RadioGroup as RadioGroup,
  _Rate as Rate,
  _Result as Result,
  _Row as Row,
  _Scrollbar as Scrollbar,
  _Select as Select,
  _Skeleton as Skeleton,
  _SkeletonItem as SkeletonItem,
  _Slider as Slider,
  _Spinner as Spinner,
  _Statistic as Statistic,
  _Step as Step,
  _Steps as Steps,
  _ElSubmenu as Submenu,
  _Switch as Switch,
  _TabPane as TabPane,
  _ElTable as Table,
  _ElTableColumn as TableColumn,
  _ElTabs as Tabs,
  _ElTag as Tag,
  _TimePicker as TimePicker,
  _TimeSelect as TimeSelect,
  _Timeline as Timeline,
  _ElTimelineItem as TimelineItem,
  _Tooltip as Tooltip,
  _Transfer as Transfer,
  _Tree as Tree,
  _Upload as Upload,
  index as default
};
