import React from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

function MatchedEntitiesList({ data }) {
  const countDuplicities: any = Object.values(
    data.reduce((a, { matchedText }) => {
      let key = `${matchedText}`;
      a[key] = a[key] || { matchedText, key: key, count: 0 };
      a[key].count++;
      return a;
    }, {})
  );

  const sortedByCount = countDuplicities.sort(
    ({ count: a }, { count: b }) => b - a
  );
  return (
    <ListGroup as="ol" numbered>
      {sortedByCount.map((item: any) => (
        <ListGroup.Item
          key={item.key}
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">{item.matchedText}</div>
          <Badge bg="primary" text="light" pill>
            {item.count}
          </Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default MatchedEntitiesList;
