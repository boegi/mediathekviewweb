import { SearchEngine, QueryObject, SearchEngineSearchResult } from '../common/search-engine';
import { ElasticsearchSearchEngine } from '../search-engine/elasticsearch';
import * as Elasticsearch from 'elasticsearch';
import { Keys as ElasticsearchKeys } from '../elasticsearch-definitions';
import { Entry } from '../common/model';
import config from '../config';
import { MediathekViewWebAPI } from '../common/api';

export { Entry, QueryObject, SearchEngineSearchResult };

export class BaseMediathekViewWebAPI implements MediathekViewWebAPI {
  private searchEngine: SearchEngine<Entry>;

  constructor() {
    const elasticsearchClient = new Elasticsearch.Client({ host: `${config.elasticsearch.host}:${config.elasticsearch.port}` });
    this.searchEngine = new ElasticsearchSearchEngine<Entry>(ElasticsearchKeys.IndexName, ElasticsearchKeys.TypeName, elasticsearchClient);
  }

  async search(query: QueryObject): Promise<SearchEngineSearchResult<Entry>> {
    const result = await this.searchEngine.search(query);

    return result;
  }
}
