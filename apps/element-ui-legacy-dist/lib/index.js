import Pagination from "./pagination.js";
import ElDialog from "./dialog.js";
import ElAutocomplete from "./autocomplete.js";
import ElDropdown from "./dropdown.js";
import ElDropdownMenu from "./dropdown-menu.js";
import ElDropdownItem from "./dropdown-item.js";
import ElMenu from "./menu.js";
import ElSubmenu from "./submenu.js";
import ElMenuItem from "./menu-item.js";
import ElMenuItemGroup from "./menu-item-group.js";
import ElInput from "./input.js";
import ElInputNumber from "./input-number.js";
import Radio from "./radio.js";
import RadioGroup from "./radio-group.js";
import RadioButton from "./radio-button.js";
import ElCheckbox from "./checkbox.js";
import ElCheckboxButton from "./checkbox-button.js";
import ElCheckboxGroup from "./checkbox-group.js";
import Switch from "./switch.js";
import Select from "./select.js";
import "./option.js";
import ElOptionGroup from "./option-group.js";
import ElButton from "./button.js";
import ElButtonGroup from "./button-group.js";
import ElTable from "./table.js";
import ElTableColumn from "./table-column.js";
import DatePicker from "./date-picker.js";
import TimeSelect from "./time-select.js";
import TimePicker from "./time-picker.js";
import Popover from "./popover.js";
import Tooltip from "./tooltip.js";
import { M as MessageBox } from "./main-CC-PwbsJ.js";
import ElBreadcrumb from "./breadcrumb.js";
import ElBreadcrumbItem from "./breadcrumb-item.js";
import ElForm from "./form.js";
import ElFormItem from "./form-item.js";
import ElTabs from "./tabs.js";
import TabPane from "./tab-pane.js";
import ElTag from "./tag.js";
import Tree from "./tree.js";
import Alert from "./alert.js";
import { N as Notification } from "./main-CWkFR6xj.js";
import Slider from "./slider.js";
import Loading from "./loading.js";
import ElIcon from "./icon.js";
import Row from "./row.js";
import ElCol from "./col.js";
import Upload from "./upload.js";
import ElProgress from "./progress.js";
import Spinner from "./spinner.js";
import { M as Message } from "./main-BQdFW-wQ.js";
import Badge from "./badge.js";
import Card from "./card.js";
import Rate from "./rate.js";
import Steps from "./steps.js";
import Step from "./step.js";
import Carousel from "./carousel.js";
import Scrollbar from "./scrollbar.js";
import ElCarouselItem from "./carousel-item.js";
import ElCollapse from "./collapse.js";
import ElCollapseItem from "./collapse-item.js";
import Cascader from "./cascader.js";
import ColorPicker from "./color-picker.js";
import Transfer from "./transfer.js";
import Container from "./container.js";
import Header from "./header.js";
import Aside from "./aside.js";
import Main from "./main.js";
import Footer from "./footer.js";
import Timeline from "./timeline.js";
import ElTimelineItem from "./timeline-item.js";
import Link from "./link.js";
import Divider from "./divider.js";
import Image from "./image.js";
import Calendar from "./calendar.js";
import Backtop from "./backtop.js";
import InfiniteScroll from "./infinite-scroll.js";
import PageHeader from "./page-header.js";
import CascaderPanel from "./cascader-panel.js";
import Avatar from "./avatar.js";
import Drawer from "./drawer.js";
import Statistic from "./statistic.js";
import Popconfirm from "./popconfirm.js";
import Skeleton from "./skeleton.js";
import SkeletonItem from "./skeleton-item.js";
import Empty from "./empty.js";
import Descriptions from "./descriptions.js";
import DescriptionsItem from "./descriptions-item.js";
import Result from "./result.js";
import locale from "element-ui/lib/locale";
import ElCollapseTransition from "element-ui/lib/transitions/collapse-transition";
import { default as default2 } from "element-ui/lib/transitions/collapse-transition";
import { E as ElOption } from "./option-Bp7COMuP.js";
const components = [
  Pagination,
  ElDialog,
  ElAutocomplete,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElInput,
  ElInputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  Switch,
  Select,
  ElOption,
  ElOptionGroup,
  ElButton,
  ElButtonGroup,
  ElTable,
  ElTableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElForm,
  ElFormItem,
  ElTabs,
  TabPane,
  ElTag,
  Tree,
  Alert,
  Slider,
  ElIcon,
  Row,
  ElCol,
  Upload,
  ElProgress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  Scrollbar,
  ElCarouselItem,
  ElCollapse,
  ElCollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Timeline,
  ElTimelineItem,
  Link,
  Divider,
  Image,
  Calendar,
  Backtop,
  PageHeader,
  CascaderPanel,
  Avatar,
  Drawer,
  Statistic,
  Popconfirm,
  Skeleton,
  SkeletonItem,
  Empty,
  Descriptions,
  DescriptionsItem,
  Result,
  ElCollapseTransition
];
const install = function(Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  Vue.use(InfiniteScroll);
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
  version: "3.0.3",
  locale: locale.use,
  i18n: locale.i18n,
  install,
  CollapseTransition: ElCollapseTransition,
  Loading,
  Pagination,
  Dialog: ElDialog,
  Autocomplete: ElAutocomplete,
  Dropdown: ElDropdown,
  DropdownMenu: ElDropdownMenu,
  DropdownItem: ElDropdownItem,
  Menu: ElMenu,
  Submenu: ElSubmenu,
  MenuItem: ElMenuItem,
  MenuItemGroup: ElMenuItemGroup,
  Input: ElInput,
  InputNumber: ElInputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox: ElCheckbox,
  CheckboxButton: ElCheckboxButton,
  CheckboxGroup: ElCheckboxGroup,
  Switch,
  Select,
  Option: ElOption,
  OptionGroup: ElOptionGroup,
  Button: ElButton,
  ButtonGroup: ElButtonGroup,
  Table: ElTable,
  TableColumn: ElTableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  MessageBox,
  Breadcrumb: ElBreadcrumb,
  BreadcrumbItem: ElBreadcrumbItem,
  Form: ElForm,
  FormItem: ElFormItem,
  Tabs: ElTabs,
  TabPane,
  Tag: ElTag,
  Tree,
  Alert,
  Notification,
  Slider,
  Icon: ElIcon,
  Row,
  Col: ElCol,
  Upload,
  Progress: ElProgress,
  Spinner,
  Message,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  Scrollbar,
  CarouselItem: ElCarouselItem,
  Collapse: ElCollapse,
  CollapseItem: ElCollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Timeline,
  TimelineItem: ElTimelineItem,
  Link,
  Divider,
  Image,
  Calendar,
  Backtop,
  InfiniteScroll,
  PageHeader,
  CascaderPanel,
  Avatar,
  Drawer,
  Statistic,
  Popconfirm,
  Skeleton,
  SkeletonItem,
  Empty,
  Descriptions,
  DescriptionsItem,
  Result
};
export {
  Alert,
  Aside,
  ElAutocomplete as Autocomplete,
  Avatar,
  Backtop,
  Badge,
  ElBreadcrumb as Breadcrumb,
  ElBreadcrumbItem as BreadcrumbItem,
  ElButton as Button,
  ElButtonGroup as ButtonGroup,
  Calendar,
  Card,
  Carousel,
  ElCarouselItem as CarouselItem,
  Cascader,
  CascaderPanel,
  ElCheckbox as Checkbox,
  ElCheckboxButton as CheckboxButton,
  ElCheckboxGroup as CheckboxGroup,
  ElCol as Col,
  ElCollapse as Collapse,
  ElCollapseItem as CollapseItem,
  default2 as CollapseTransition,
  ColorPicker,
  Container,
  DatePicker,
  Descriptions,
  DescriptionsItem,
  ElDialog as Dialog,
  Divider,
  Drawer,
  ElDropdown as Dropdown,
  ElDropdownItem as DropdownItem,
  ElDropdownMenu as DropdownMenu,
  Empty,
  Footer,
  ElForm as Form,
  ElFormItem as FormItem,
  Header,
  ElIcon as Icon,
  Image,
  InfiniteScroll,
  ElInput as Input,
  ElInputNumber as InputNumber,
  Link,
  Loading,
  Main,
  ElMenu as Menu,
  ElMenuItem as MenuItem,
  ElMenuItemGroup as MenuItemGroup,
  Message,
  MessageBox,
  Notification,
  ElOption as Option,
  ElOptionGroup as OptionGroup,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  ElProgress as Progress,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  Result,
  Row,
  Scrollbar,
  Select,
  Skeleton,
  SkeletonItem,
  Slider,
  Spinner,
  Statistic,
  Step,
  Steps,
  ElSubmenu as Submenu,
  Switch,
  TabPane,
  ElTable as Table,
  ElTableColumn as TableColumn,
  ElTabs as Tabs,
  ElTag as Tag,
  TimePicker,
  TimeSelect,
  Timeline,
  ElTimelineItem as TimelineItem,
  Tooltip,
  Transfer,
  Tree,
  Upload,
  index as default
};
