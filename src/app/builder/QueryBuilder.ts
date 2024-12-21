import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this.query.search;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: searchTerm, $options: "i" },
                        }) as FilterQuery<T>,
                ),
            });
        }
        return this;
    }

    filter() {
        const queryObj = { ...this.query };
        const excludeFields = ["search", "sortBy", "sortOrder"];
        excludeFields.forEach((element) => delete queryObj[element]);
        if (this.query.filter) {
            queryObj.author = this.query.filter;
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        const sortBy = this.query.sortBy;
        const sortOrder = this.query.sortOrder === "desc" ? "-" : "";
        this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);
        return this;
    }
}

export default QueryBuilder;
