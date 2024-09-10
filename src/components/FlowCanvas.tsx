/* eslint-disable @typescript-eslint/no-explicit-any */
import "@xyflow/react/dist/style.css";
import { ReactFlow, Controls, Background, Handle, Position } from "@xyflow/react";
import { dummyResponseData } from "@/lib/utils";
import externalIcon from '/external-white.svg'

// method to recursively parse the data and generate nodes and edges
const parseData = (data: any[], parentId: any = null, x = 0, y = 0) => {
    const nodes: any[] = [];
    const edges: any[] = [];
    let currentY = y; // track current y position

    data.forEach((item, index) => {
        const nodeId = `${parentId || "root"}_${index}`; // unique ID for each node

        let childNodes = [];
        let childEdges = [];

        // If the item has children, recursively add them with new X, Y
        if (item.children && item.children.length > 0) {
            // Recursively process children
            const childData = parseData(item.children, nodeId, x + 400, currentY);
            childNodes = childData.nodes;
            childEdges = childData.edges;

            // Calculate the total height of all child nodes
            const totalHeight = (item.children.length - 1) * 160;
            const centerY = currentY + totalHeight / 2;

            nodes.push({
                id: nodeId,
                type: "customNode",
                data: {
                    label: (
                        <>
                            <div className="border-b border-[#FFAD62] p-2 flex justify-between items-center">
                                <div className="font-medium text-sm leading-4">{item.function}</div>
                                <img src={externalIcon} alt="icon" />
                            </div>
                            <div className="p-2">

                                <div className="my-2 font-medium text-sm leading-4">
                                    {item.response_object}
                                </div>

                                <ul>
                                    {item.params.map((param: any, idx: number) => (
                                        <li key={idx} className="my-2 font-normal text-xs leading-3">
                                            <span className="text-[#FFAD62]">{param.identifier}:</span> {param.type || "null"}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ),
                    hasParent: !!parentId,
                    hasChildren: item.children && item.children.length > 0,
                },
                position: { x: x, y: centerY },
            });

            // Only connect parent to immediate children
            item.children.forEach((_child: any, childIdx: number) => {
                edges.push({
                    id: `e_${nodeId}_${childIdx}`,
                    source: nodeId,
                    target: `${nodeId}_${childIdx}`,
                    type: "default",
                    animated: false, // Solid line without animation
                    style: { stroke: "#7C7C7C", strokeWidth: 2 }, // Solid line
                    markerEnd: {
                        type: "arrowclosed", // Arrow at the end
                    },
                });
            });

            nodes.push(...childNodes);
            edges.push(...childEdges);

            // Update currentY to continue placing the next child node below
            currentY += totalHeight + 250;
        } else {
            // No children, place the node at the current Y position
            nodes.push({
                id: nodeId,
                type: "customNode",
                data: {
                    label: (
                        <>
                            <div className="border-b border-[#FFAD62] p-2 flex justify-between items-center">
                                <div className="font-medium text-sm leading-4">{item.function}</div>
                                <img src={externalIcon} alt="icon" />
                            </div>
                            <div className="p-2">

                                <div className="my-2 font-medium text-sm leading-4">
                                    {item.response_object}
                                </div>

                                <ul>
                                    {item.params.map((param: any, idx: number) => (
                                        <li key={idx} className="my-2 font-normal text-xs leading-3">
                                            <span className="text-[#FFAD62]">{param.identifier}:</span> {param.type || "null"}
                                        </li>
                                    ))}
                                </ul>
                            </div>
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
                    style: { stroke: "#7C7C7C", strokeWidth: 2 },
                    markerEnd: {
                        type: "arrowclosed",
                    },
                });
            }

            currentY += 160; // Increment currentY for next sibling node
        }
    });

    return { nodes, edges };
};

// Custom Node Component to show dots on the nodes - show only connected ones
const CustomNode = ({ data }: { data: any }) => {
    const { label, hasParent, hasChildren } = data;

    return (
        <div
            style={{
                border: "1px solid #FFAD62",
                borderRadius: 4,
                width: "100%",
            }}
        >
            {label}
            {hasParent && (
                <Handle type="target" position={Position.Left} style={{ background: "#555" }} />
            )}
            {hasChildren && (
                <Handle type="source" position={Position.Right} style={{ background: "#555" }} />
            )}
        </div>
    );
};

const nodeTypes = {
    customNode: CustomNode,
};

const rfStyle = {
    backgroundColor: "#181E25",
};

const FlowCanvas = () => {

    // Note: render dummy data
    // call GET API to fetch the data from server - define a new state here to manage the response data

    const { nodes, edges } = parseData(dummyResponseData);

    return (
        <div style={{ height: "100%", width: "100%", color: '#ffff' }}>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                fitView
                style={rfStyle}
            >
                <Controls className="text-[#181E25]" />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default FlowCanvas;