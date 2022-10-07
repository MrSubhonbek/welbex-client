import {
  MDBBtn,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { FC, useState } from "react";
import { IExpenses, ILimit, PagType } from "../store/models/IExpenses";
import {
  useFetchLimitDataMutation,
  useFetchSearchDataMutation,
  useFetchSortDataMutation,
} from "../store/services/ExpensesService";

interface IProps {
  limit: ILimit;
  typePag: PagType;
  searchValue: string;
  sortColum: string;
  setData: (data: IExpenses[] | undefined) => void;
  setLimit: (limit: ILimit) => void;
}

export const Pagination: FC<IProps> = ({
  limit,
  setData,
  setLimit,
  typePag,
  searchValue,
  sortColum,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [normal, {}] = useFetchLimitDataMutation();
  const [sort, {}] = useFetchSortDataMutation();
  const [search, {}] = useFetchSearchDataMutation();
  const increase = limit.end;
  const handleNext = async () => {
    switch (typePag) {
      case "normal": {
        const data = await normal({
          start: limit.start + increase,
          end: limit.end + increase,
        }).unwrap();
        if (data.length >= 1) {
          setData(data);
          setLimit({
            start: limit.start + increase,
            end: limit.end + increase,
          });
          setCurrentPage(currentPage + 1);
        }
        break;
      }
      case "search": {
        const data = await search({
          searchValue,
          limit: {
            start: limit.start + increase,
            end: limit.end + increase,
          },
        }).unwrap();
        if (data.length >= 1) {
          setData(data);
          setLimit({
            start: limit.start + increase,
            end: limit.end + increase,
          });
          setCurrentPage(currentPage + 1);
        }
        break;
      }
      case "sort": {
        const data = await sort({
          sortColum,
          limit: {
            start: limit.start + increase,
            end: limit.end + increase,
          },
        }).unwrap();
        if (data.length >= 1) {
          setData(data);
          setLimit({
            start: limit.start + increase,
            end: limit.end + increase,
          });
          setCurrentPage(currentPage + 1);
        }
        break;
      }
    }
  };
  const handlePrev = async () => {
    if (currentPage <= 1) {
      return;
    }
    switch (typePag) {
      case "normal": {
        const data = await normal({
          start: limit.start - increase,
          end: limit.end - increase,
        }).unwrap();
        setData(data);
        setLimit({
          start: limit.start - increase,
          end: limit.end - increase,
        });
        setCurrentPage(currentPage - 1);
        break;
      }
      case "search": {
        const data = await search({
          searchValue,
          limit: {
            start: limit.start - increase,
            end: limit.end - increase,
          },
        }).unwrap();
        setData(data);
        setLimit({
          start: limit.start - increase,
          end: limit.end - increase,
        });
        setCurrentPage(currentPage - 1);
        break;
      }
      case "sort": {
        const data = await sort({
          sortColum,
          limit: {
            start: limit.start - increase,
            end: limit.end - increase,
          },
        }).unwrap();
        setData(data);
        setLimit({
          start: limit.start - increase,
          end: limit.end - increase,
        });
        setCurrentPage(currentPage - 1);
        break;
      }
    }
  };

  const renderPagination = () => {
    return (
      <MDBPagination className="mb-0">
        <MDBPaginationItem>
          <MDBBtn onClick={handlePrev}>Prev</MDBBtn>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink>{currentPage}</MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBBtn onClick={handleNext}>Next</MDBBtn>
        </MDBPaginationItem>
      </MDBPagination>
    );
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "250px",
        alignContent: "center",
      }}
    >
      {renderPagination()}
    </div>
  );
};
