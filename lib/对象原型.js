AVLayer.prototype.instance = "Layer";
TextLayer.prototype.instance = "Layer";
ShapeLayer.prototype.instance = "Layer";
CameraLayer.prototype.instance = "Layer";
LightLayer.prototype.instance = "Layer";
Property.prototype.instance = "Property";
PropertyGroup.prototype.instance = "Property";
Property.prototype.containingComp = function () {
    return this.propertyGroup(this.propertyDepth).containingComp;
};
Property.prototype.containingLayer = function () {
    return this.propertyGroup(this.propertyDepth);
};
Property.prototype.getPropertyType = function () {
    switch (this.propertyValueType) {
        case PropertyValueType.OneD:
            propType = "1d";
            break;
        case PropertyValueType.TwoD:
            propType = "2d";
            break;
        case PropertyValueType.TwoD_SPATIAL:
            propType = "2d";
            break;
        case PropertyValueType.ThreeD:
            propType = "3d";
            break;
        case PropertyValueType.ThreeD_SPATIAL:
            propType = "3d";
            break;
        case PropertyValueType.COLOR:
            propType = "color";
            break;
        default:
            propType = "non";
            break;
    }
    // if (!this.canVaryOverTime) {
    //     propType = "non";
    // }
    return propType;
};
Property.prototype.getPropertyPath = function () {
    var propPath = "";
    while (this.parentProperty) {
        propPath = "(" + this.propertyIndex + ")" + propPath;
        this = this.parentProperty;
    }
    return propPath;
};