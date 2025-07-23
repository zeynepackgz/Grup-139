import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import PodcastOynatici from "./PodcastOynatici";

function KavramHaritasi({ data }) {
  const { notlar, kavramlar } = data;
  const dusukNotluDersler = Object.keys(notlar).filter((ders) => notlar[ders] < 60);
  const svgRef = useRef();

  useEffect(() => {
    if (dusukNotluDersler.length === 0) return;

    const nodes = [];
    const links = [];

    dusukNotluDersler.forEach((ders) => {
      nodes.push({ id: ders, group: 1 });
      Object.keys(kavramlar[ders] || {}).forEach((kavram) => {
        nodes.push({ id: kavram, group: 2 });
        links.push({ source: ders, target: kavram });
      });
    });

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#aaa")
      .selectAll("line")
      .data(links)
      .join("line");

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 10)
      .attr("fill", d => d.group === 1 ? "orange" : "lightblue")
      .call(drag(simulation));

    const label = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text(d => d.id)
      .attr("font-size", 12)
      .attr("dx", 12)
      .attr("dy", ".35em");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      label
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

  }, [dusukNotluDersler, kavramlar]);

  if (dusukNotluDersler.length === 0) {
    return <p>Tüm dersler 60'ın üzerinde 🎉</p>;
  }

  return (
    <div>
      <h2>Düşük Notlu Dersler İçin Kavram Haritası</h2>
      <svg ref={svgRef} width="600" height="400" style={{ border: "1px solid #ccc" }} />
      {dusukNotluDersler.map((ders) => (
        <div key={ders} style={{ marginTop: "20px" }}>
          <h3>{ders}</h3>
          <ul>
            {Object.keys(kavramlar[ders] || {}).map((kavram) => (
              <li key={kavram}>
                <strong>{kavram}</strong><br />
                <PodcastOynatici src={kavramlar[ders][kavram].podcast} />
                <p>{kavramlar[ders][kavram].hikaye}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default KavramHaritasi;
