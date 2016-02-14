<a name="module_sway-connect/matcher"></a>
## sway-connect/matcher
Middleware to match requests to Sway paths and/or operations.


* [sway-connect/matcher](#module_sway-connect/matcher)
    * [module.exports(api)](#exp_module_sway-connect/matcher--module.exports) ⇒ <code>function</code> ⏏
        * [~Operation](#external_Operation)
        * [~Path](#external_Path)
        * [~SwaggerApi](#external_SwaggerApi)
        * [~SwayContainer](#module_sway-connect/matcher--module.exports..SwayContainer) : <code>object</code>

<a name="exp_module_sway-connect/matcher--module.exports"></a>
### module.exports(api) ⇒ <code>function</code> ⏏
Middleware providing the base functionality for Swagger integrations.  This middleware will take a request and for
requests matching a path described in your Swagger document, `req.sway` will be set.  The structure for `req.sway`
is described at [SwayContainer](SwayContainer).

**Kind**: Exported function  
**Returns**: <code>function</code> - The request handler  

| Param | Type | Description |
| --- | --- | --- |
| api | <code>[SwaggerApi](#external_SwaggerApi)</code> | The SwaggerApi object created via `Sway#create` |

<a name="external_Operation"></a>
#### module.exports~Operation
The Operation object provided by Sway.

**Kind**: inner external of <code>[module.exports](#exp_module_sway-connect/matcher--module.exports)</code>  
**See**: [https://github.com/apigee-127/sway/blob/master/docs/API.md#module_Sway..Operation](https://github.com/apigee-127/sway/blob/master/docs/API.md#module_Sway..Operation)  
<a name="external_Path"></a>
#### module.exports~Path
The Path object provided by Sway.

**Kind**: inner external of <code>[module.exports](#exp_module_sway-connect/matcher--module.exports)</code>  
**See**: [https://github.com/apigee-127/sway/blob/master/docs/API.md#module_Sway..Path](https://github.com/apigee-127/sway/blob/master/docs/API.md#module_Sway..Path)  
<a name="external_SwaggerApi"></a>
#### module.exports~SwaggerApi
The Swagger API object provided by Sway.

**Kind**: inner external of <code>[module.exports](#exp_module_sway-connect/matcher--module.exports)</code>  
**See**: [https://github.com/apigee-127/sway/blob/master/docs/API.md#module_Sway..SwaggerApi](https://github.com/apigee-127/sway/blob/master/docs/API.md#module_Sway..SwaggerApi)  
<a name="module_sway-connect/matcher--module.exports..SwayContainer"></a>
#### module.exports~SwayContainer : <code>object</code>
Container for the pertinent Sway resources set at `req.sway`.

**Kind**: inner typedef of <code>[module.exports](#exp_module_sway-connect/matcher--module.exports)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| api | <code>[SwaggerApi](#external_SwaggerApi)</code> | The Swagger API object provided to the middleware initializer |
| path | <code>[Path](#external_Path)</code> | The corresponding Path object provided by Sway |
| operation | <code>[Operation](#external_Operation)</code> | The corresponding Operation object provided by Sway |

