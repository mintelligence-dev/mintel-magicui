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
import StepperExample from "./stepper"
import TimelineExample from "./timeline"
import AvatarExample from "./avatar"
import SkeletonExample from "./skeleton"
import ProgressExample from "./progress"
import ProgressRingExample from "./progress-ring"
import AlertExample from "./alert"
import EmptyStateExample from "./empty-state"
import AccordionExample from "./accordion"
import BreadcrumbExample from "./breadcrumb"
import PaginationExample from "./pagination"
import SheetExample from "./sheet"
import CommandExample from "./command"
import SidebarExample from "./sidebar"
import SliderExample from "./slider"
import ToggleGroupExample from "./toggle-group"
import TagInputExample from "./tag-input"
import FileUploadExample from "./file-upload"
import ThaiAddressExample from "./thai-address"
import ThaiIdInputExample from "./thai-id-input"
import ThaiPhoneInputExample from "./thai-phone-input"
import OtpInputExample from "./otp-input"
import DataTableExample from "./data-table"
import ChartExample from "./chart"
import GroupedListExample from "./grouped-list"
import ConversationExample from "./conversation"
import CollapsingHeaderExample from "./collapsing-header"
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
import FontSizeControlExample from "./font-size-control"
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
import SectionHeaderExample from "./section-header"
import SectionHeroSplitExample from "./section-hero-split"
import SectionHeroCenteredExample from "./section-hero-centered"
import SectionLogoCloudExample from "./section-logo-cloud"
import SectionTestimonialsExample from "./section-testimonials"
import SectionStatsExample from "./section-stats"
import SectionFeatureGridExample from "./section-feature-grid"
import SectionFeatureScrollExample from "./section-feature-scroll"
import SectionFeatureSlideshowExample from "./section-feature-slideshow"
import SectionFeatureBentoExample from "./section-feature-bento"
import SectionCarouselExample from "./section-carousel"
import SectionPricingExample from "./section-pricing"
import SectionFaqExample from "./section-faq"
import SectionCtaExample from "./section-cta"
import SectionContactExample from "./section-contact"
import SectionFooterExample from "./section-footer"

export const EXAMPLES: Record<string, ComponentType> = {
  "button": ButtonExample,
  "badge": BadgeExample,
  "card": CardExample,
  "input": InputExample,
  "dialog": DialogExample,
  "select": SelectExample,
  "table": TableExample,
  "stepper": StepperExample,
  "timeline": TimelineExample,
  "avatar": AvatarExample,
  "skeleton": SkeletonExample,
  "progress": ProgressExample,
  "progress-ring": ProgressRingExample,
  "alert": AlertExample,
  "empty-state": EmptyStateExample,
  "accordion": AccordionExample,
  "breadcrumb": BreadcrumbExample,
  "pagination": PaginationExample,
  "sheet": SheetExample,
  "command": CommandExample,
  "sidebar": SidebarExample,
  "slider": SliderExample,
  "toggle-group": ToggleGroupExample,
  "tag-input": TagInputExample,
  "file-upload": FileUploadExample,
  "thai-address": ThaiAddressExample,
  "thai-id-input": ThaiIdInputExample,
  "thai-phone-input": ThaiPhoneInputExample,
  "otp-input": OtpInputExample,
  "data-table": DataTableExample,
  "chart": ChartExample,
  "grouped-list": GroupedListExample,
  "conversation": ConversationExample,
  "collapsing-header": CollapsingHeaderExample,
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
  "font-size-control": FontSizeControlExample,
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
  "section-header": SectionHeaderExample,
  "section-hero-split": SectionHeroSplitExample,
  "section-hero-centered": SectionHeroCenteredExample,
  "section-logo-cloud": SectionLogoCloudExample,
  "section-testimonials": SectionTestimonialsExample,
  "section-stats": SectionStatsExample,
  "section-feature-grid": SectionFeatureGridExample,
  "section-feature-scroll": SectionFeatureScrollExample,
  "section-feature-slideshow": SectionFeatureSlideshowExample,
  "section-feature-bento": SectionFeatureBentoExample,
  "section-carousel": SectionCarouselExample,
  "section-pricing": SectionPricingExample,
  "section-faq": SectionFaqExample,
  "section-cta": SectionCtaExample,
  "section-contact": SectionContactExample,
  "section-footer": SectionFooterExample,
}
