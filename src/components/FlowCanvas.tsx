import { ReactFlow, Controls, Background, Handle } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const jsonData = [
    {
        function: "cart_router.py",
        params: [
            {
                identifier: "request",
                type: "Request",
            },
            {
                identifier: "fastapi_response",
                type: "Response",
            },
        ],
        response_object: "add_item_to_cart",
        children: [
            {
                function: "/litellm/proxy/proxy_server.py:ProxyConfig.load_team_config",
                params: [
                    {
                        identifier: "self",
                        type: null,
                    },
                    {
                        identifier: "team_id",
                        type: "str",
                    },
                ],
                response_object: "",
                children: [
                    {
                        function: "/litellm/proxy/proxy_server.py:ProxyConfig.get_config",
                        params: [
                            {
                                identifier: "self",
                                type: null,
                            },
                        ],
                        response_object: "dict",
                        children: [
                            {
                                function: "/litellm/proxy/utils.py:update_spend",
                                params: [
                                    {
                                        identifier: "prisma_client",
                                        type: "PrismaClient",
                                    },
                                    {
                                        identifier: "db_writer_client",
                                        type: "Optional[HTTPHandler]",
                                    },
                                    {
                                        identifier: "proxy_logging_obj",
                                        type: "ProxyLogging",
                                    },
                                ],
                                response_object: "",
                                children: [
                                    {
                                        function: "/litellm/proxy/utils.py:print_verbose",
                                        params: [
                                            {
                                                identifier: "print_statement",
                                                type: null,
                                            },
                                        ],
                                        response_object: "",
                                        children: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        function: "/litellm/proxy/utils.py:_is_valid_team_configs",
                        params: [],
                        response_object: "",
                        children: [],
                    },
                    {
                        function: "/litellm/proxy/utils.py:_is_valid_team_configs",
                        params: [],
                        response_object: "",
                        children: [],
                    },
                ],
            },
            {
                function: "/litellm/proxy/proxy_server.py:parse_cache_control",
                params: [
                    {
                        identifier: "cache_control",
                        type: null,
                    },
                ],
                response_object: "",
                children: [
                    {
                        function: "/litellm/proxy/proxy_server.py:ProxyConfig.get_config",
                        params: [
                            {
                                identifier: "self",
                                type: null,
                            },
                        ],
                        response_object: "dict",
                        children: [
                            {
                                function: "/litellm/proxy/utils.py:update_spend",
                                params: [
                                    {
                                        identifier: "prisma_client",
                                        type: "PrismaClient",
                                    },
                                    {
                                        identifier: "db_writer_client",
                                        type: "Optional[HTTPHandler]",
                                    },
                                    {
                                        identifier: "proxy_logging_obj",
                                        type: "ProxyLogging",
                                    },
                                ],
                                response_object: "",
                                children: [
                                    {
                                        function: "/litellm/proxy/utils.py:print_verbose",
                                        params: [
                                            {
                                                identifier: "print_statement",
                                                type: null,
                                            },
                                        ],
                                        response_object: "",
                                        children: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        function: "/litellm/proxy/utils.py:_is_valid_team_configs",
                        params: [],
                        response_object: "",
                        children: [],
                    },
                    {
                        function: "/litellm/proxy/utils.py:_is_valid_team_configs",
                        params: [],
                        response_object: "",
                        children: [],
                    },
                ],
            },
        ],
    },
];

// Recursively parse the JSON data and generate nodes and edges
const parseData = (data, parentId = null, x = 0, y = 0) => {
    const nodes = [];
    const edges = [];
    let currentY = y; // Track the current y position

    data.forEach((item, index) => {
        const nodeId = `${parentId || "root"}_${index}`; // unique ID for each node

        let childNodes = [];
        let childEdges = [];

        // If the item has children, recursively add them with new X, Y
        if (item.children && item.children.length > 0) {
            // Recursively process children
            const childData = parseData(item.children, nodeId, x + 300, currentY);
            childNodes = childData.nodes;
            childEdges = childData.edges;

            // Calculate the total height of all child nodes
            const totalHeight = (item.children.length - 1) * 150;
            const centerY = currentY + totalHeight / 2;

            nodes.push({
                id: nodeId,
                type: "customNode",
                data: {
                    label: (
                        <>
                            <strong>{item.function}</strong>
                            <ul>
                                {item.params.map((param, idx) => (
                                    <li key={idx}>
                                        {param.identifier}: {param.type || "null"}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ),
                    hasParent: !!parentId,
                    hasChildren: item.children && item.children.length > 0,
                },
                position: { x: x, y: centerY },
            });

            // Only connect parent to immediate children
            item.children.forEach((child, childIdx) => {
                edges.push({
                    id: `e_${nodeId}_${nodeId}_${childIdx}`,
                    source: nodeId,
                    target: `${nodeId}_${childIdx}`,
                    type: "default",
                    animated: false, // Solid line without animation
                    style: { stroke: "#000", strokeWidth: 2 }, // Solid line
                    markerEnd: {
                        type: "arrowclosed", // Arrow at the end
                    },
                });
            });

            nodes.push(...childNodes);
            edges.push(...childEdges);

            // Update currentY to continue placing the next child node below
            currentY += totalHeight + 150;
        } else {
            // No children, place the node at the current Y position
            nodes.push({
                id: nodeId,
                type: "customNode",
                data: {
                    label: (
                        <>
                            <strong>{item.function}</strong>
                            <ul>
                                {item.params.map((param, idx) => (
                                    <li key={idx}>
                                        {param.identifier}: {param.type || "null"}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ),
                    hasParent: !!parentId,
                    hasChildren: false,
                },
                position: { x: x, y: currentY },
            });

            if (parentId) {
                edges.push({
                    id: `e_${parentId}_${nodeId}`,
                    source: parentId,
                    target: nodeId,
                    type: "default",
                    animated: false,
                    style: { stroke: "#000", strokeWidth: 2 },
                    markerEnd: {
                        type: "arrowclosed",
                    },
                });
            }

            currentY += 150; // Increment currentY for next sibling node
        }
    });

    return { nodes, edges };
};

// Custom Node Component
const CustomNode = ({ data }) => {
    const { label, hasParent, hasChildren } = data;

    return (
        <div
            style={{
                padding: 10,
                border: "1px solid black",
                borderRadius: 5,
                width: 200,
            }}
        >
            {label}
            {hasParent && (
                <Handle type="target" position="left" style={{ background: "#555" }} />
            )}
            {hasChildren && (
                <Handle type="source" position="right" style={{ background: "#555" }} />
            )}
        </div>
    );
};

const nodeTypes = {
    customNode: CustomNode,
};

const rfStyle = {
    backgroundColor: "#363848",
};

const FlowCanvas = () => {
    const { nodes, edges } = parseData(jsonData);

    return (
        <div style={{ height: "90vh", width: "100%", color: '#ffff' }}>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                fitView
                style={rfStyle}
            >
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default FlowCanvas;