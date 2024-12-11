"use client";
import React from "react";
import Card from "@/components/ui/card-snippet";
import DefaultBreadCrumb from "./defalut-breadcrumb";
import DisabledBreadCrumb from "./disabled-breadcrumb";
import {
  collapsingBreadcrumb,
  colorBreadcrumb,
  controlledBreadcrumb,
  customSeparator,
  customizeCollapsingBreadcrumb,
  defaultBreadCrumb,
  disabledBreadCrumb,
  menuTypeBreadcrumb,
  radiusBreadcrumb,
  routingBreadcrumb,
  sizeBreadcrumb,
  startIconBreadcrumb,
  styleBreadcrumb,
  underlinesBreadcrumb,
} from "./source-code.js";
import SizeBreadcrumb from "./size-breadcrumb";
import ColorBreadcrumb from "./color-breadcrumb";
import StyleBreadcrumb from "./style-breadcrumb";
import UnderlinesBreadcrumb from "./underlines-breadcrumb";
import RadiusBreadcrumb from "./radius-breadcrumb";
import RoutingBreadcrumb from "./routing-breadcrumb";
import StartIconBreadcrumb from "./start-icon-breadcrumb";
import CustomSeparator from "./custom-separator";
import CollapsingBreadcrumb from "./collapsing-breadcrumb";
import CustomizeCollapsingBreadcrumb from "./customize-collapsing-breadcrumb";
import ControlledBreadcrumb from "./controlled-breadcrumb";
import MenuTypeBreadcrumb from "./menu-type-breadcrumb";

const BreadCrumbPage = () => {
  return (
    <div className="space-y-5">
      <Card title="Default Breadcrumb" code={defaultBreadCrumb}>
        <p className="text-muted-foreground mb-5 text-sm">
          <span className="text-primary">Breadcrumbs</span> is the main
          component, which is a wrapper for the other components and show as a
          breadcrumb component..{" "}
          <span className="text-primary">BreadcrumbItem</span> is the component
          that represents a breadcrumb item also hold the text in it and show as
          a breadcrumb item.
        </p>
        <div>
          <DefaultBreadCrumb />
        </div>
      </Card>
      <Card title="Disabled Breadcrumb" code={disabledBreadCrumb}>
        <p className="text-muted-foreground mb-5 text-sm">
          The <span className="text-primary">disabled </span> props helps
          breadcrumbs display items but prevent navigation, ensuring a
       
          disabled.
        </p>
        <div>
          <DisabledBreadCrumb />
        </div>
      </Card>
      <Card title="Sizes Breadcrumb" code={sizeBreadcrumb}>
        <p className="text-muted-foreground mb-5 text-sm">
          The <span className="text-primary">size </span> props helps
          breadcrumbs display items in different font size of three different
         
        </p>
        <div className="space-y-4">
          <SizeBreadcrumb />
        </div>
      </Card>
      <Card title="Color Breadcrumb" code={colorBreadcrumb}>
       
        <div className="space-y-2">
          <ColorBreadcrumb />
        </div>
      </Card>
      <Card title="Style Breadcrumb" code={styleBreadcrumb}>
        <p className="text-muted-foreground mb-5 text-sm">
          The <span className="text-primary">styled </span> props helps
          breadcrumbs display items in different styles of three different style
        
        </p>
        <div className="space-y-4">
          <StyleBreadcrumb />
        </div>
      </Card>
      <Card title="Underlines" code={underlinesBreadcrumb}>
        <p className="text-muted-foreground mb-5 text-sm">
          The <span className="text-primary">underlines </span> props helps
          breadcrumbs display items in different styles of five different style.
         
        </p>
        <div>
          <UnderlinesBreadcrumb />
        </div>
      </Card>
      <Card title="Border Radius" code={radiusBreadcrumb}>
        <p className="text-muted-foreground mb-5 text-sm">
          The <span className="text-primary">tailwind class </span> for
          border-radius property rounded helps design the border-radius
        
        </p>
        <div>
          <RadiusBreadcrumb />
        </div>
      </Card>
      <Card title="Routing" code={routingBreadcrumb}>
       
        <div>
          <RoutingBreadcrumb />
        </div>
      </Card>
      <Card title="With Icon" code={startIconBreadcrumb}>
      
        <div className="space-y-4">
          <StartIconBreadcrumb />
        </div>
      </Card>
      <Card title="Custom  Separator" code={customSeparator}>
        <p className="text-muted-foreground mb-5 text-sm">
          The <span className="text-primary">separator</span> props helps
          breadcrumb to change the style of the breadcrumb divider into any kind
          of style can show.
        </p>
        <div>
          <CustomSeparator />
        </div>
      </Card>
      <Card title="Collapsing Breadcrumb" code={collapsingBreadcrumb}>
        <p className="text-muted-foreground mb-5 text-sm">
          If the breadcrumb is too long we can minimize the length, item that
          will be shown before and after the minimize of breadcrumb by using{" "}
          <span className="text-primary">
            maxItems , itemsBeforeCollapse, itemsAfterCollapse{" "}
          </span>{" "}
          props.
        </p>
        <div>
          <CollapsingBreadcrumb />
        </div>
      </Card>
      <Card
        title="Customize Collapsing Breadcrumb"
        code={customizeCollapsingBreadcrumb}
      >
        <p className="text-muted-foreground mb-5 text-sm">
          If the breadcrumb is too long we can minimize the length, item that
          will be shown before and after the minimize of breadcrumb by using{" "}
          <span className="text-primary">
            maxItems , itemsBeforeCollapse, itemsAfterCollapse{" "}
          </span>{" "}
          props. also we can use{" "}
          <span className="text-primary">renderEllipsis</span> props to show
          folded item from ellipsis as menu.
        </p>
        <div>
          <CustomizeCollapsingBreadcrumb />
        </div>
      </Card>
      <Card title="Controlled Breadcrumb" code={controlledBreadcrumb}>
        <p className="text-muted-foreground mb-5 text-sm">
          On select any Item of Breadcrumb the single item will be selected and
          stay active and other item will be unselected. Only the
          <span className="text-primary"> key and isCurrent </span> props can
          helps to select an active. Key prop take the item value isCurrent
          props helps to take variable state of current page . If needed you can
          use the onClick prop to handle the click event on the breadcrumb item.
        </p>
        <div>
          <ControlledBreadcrumb />
        </div>
      </Card>
      <Card title="Menu Type" code={menuTypeBreadcrumb}>
        <p className="text-muted-foreground mb-5 text-sm">
          On select any Item of <span className="text-primary">Breadcrumb </span> the single item will
          be selected and stay active and other item will be unselected also
          there will be no separator also show like button. It is possible to use the
          Breadcrumbs component as a horizontal menu.
        </p>
        <div>
          <MenuTypeBreadcrumb />
        </div>
      </Card>
    </div>
  );
};

export default BreadCrumbPage;
