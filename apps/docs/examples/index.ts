// One example per registry item: rendered as the preview and shown as the code on its docs page.
// Completeness is checked by scripts/build-registry.mjs.
import type { ComponentType } from "react"

import ButtonExample from "./button"
import BadgeExample from "./badge"
import CardExample from "./card"
import InputExample from "./input"
import DialogExample from "./dialog"
import SelectExample from "./select"
import TableExample from "./table"
import TabsExample from "./tabs"
import ToastExample from "./toast"
import LabelExample from "./label"
import TextareaExample from "./textarea"
import CheckboxExample from "./checkbox"
import RadioGroupExample from "./radio-group"
import SwitchExample from "./switch"
import FormExample from "./form"
import ComboboxExample from "./combobox"
import CalendarExample from "./calendar"
import DatePickerExample from "./date-picker"
import DropdownMenuExample from "./dropdown-menu"
import TooltipExample from "./tooltip"
import PopoverExample from "./popover"
import AnimatedBeamExample from "./animated-beam"
import AnimatedGradientTextExample from "./animated-gradient-text"
import AuroraTextExample from "./aurora-text"
import BlurFadeExample from "./blur-fade"
import BorderBeamExample from "./border-beam"
import DotPatternExample from "./dot-pattern"
import MagicCardExample from "./magic-card"
import MarqueeExample from "./marquee"
import MeteorsExample from "./meteors"
import NumberTickerExample from "./number-ticker"
import ShimmerButtonExample from "./shimmer-button"
import ShineBorderExample from "./shine-border"
import GlassCardExample from "./glass-card"
import GlassButtonExample from "./glass-button"
import GlassNavbarExample from "./glass-navbar"
import SegmentedControlExample from "./segmented-control"
import ScrollRevealTextExample from "./scroll-reveal-text"
import StickyShowcaseExample from "./sticky-showcase"
import ZoomParallaxExample from "./zoom-parallax"
import DockExample from "./dock"
import AnimatedTabsExample from "./animated-tabs"
import DrawerExample from "./drawer"
import TabBarExample from "./tab-bar"

export const EXAMPLES: Record<string, ComponentType> = {
  "button": ButtonExample,
  "badge": BadgeExample,
  "card": CardExample,
  "input": InputExample,
  "dialog": DialogExample,
  "select": SelectExample,
  "table": TableExample,
  "tabs": TabsExample,
  "toast": ToastExample,
  "label": LabelExample,
  "textarea": TextareaExample,
  "checkbox": CheckboxExample,
  "radio-group": RadioGroupExample,
  "switch": SwitchExample,
  "form": FormExample,
  "combobox": ComboboxExample,
  "calendar": CalendarExample,
  "date-picker": DatePickerExample,
  "dropdown-menu": DropdownMenuExample,
  "tooltip": TooltipExample,
  "popover": PopoverExample,
  "animated-beam": AnimatedBeamExample,
  "animated-gradient-text": AnimatedGradientTextExample,
  "aurora-text": AuroraTextExample,
  "blur-fade": BlurFadeExample,
  "border-beam": BorderBeamExample,
  "dot-pattern": DotPatternExample,
  "magic-card": MagicCardExample,
  "marquee": MarqueeExample,
  "meteors": MeteorsExample,
  "number-ticker": NumberTickerExample,
  "shimmer-button": ShimmerButtonExample,
  "shine-border": ShineBorderExample,
  "glass-card": GlassCardExample,
  "glass-button": GlassButtonExample,
  "glass-navbar": GlassNavbarExample,
  "segmented-control": SegmentedControlExample,
  "scroll-reveal-text": ScrollRevealTextExample,
  "sticky-showcase": StickyShowcaseExample,
  "zoom-parallax": ZoomParallaxExample,
  "dock": DockExample,
  "animated-tabs": AnimatedTabsExample,
  "drawer": DrawerExample,
  "tab-bar": TabBarExample,
}
