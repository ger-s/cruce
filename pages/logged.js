import { Button } from "semantic-ui-react";
import Link from "next/link";

function logged() {
  return (
    <div
      className="ui container"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "15%",
        marginBottom: "24%",
      }}
    >
      <Link href="/turno">
        <Button secondary size="massive">
          Sacar turno
        </Button>
      </Link>
    </div>
  );
}

export default logged;
