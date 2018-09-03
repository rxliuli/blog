# SpingBoot 集成缓存

## 场景

使用数据库已经不足以满足我们对性能的需求了（经常需要重复查询的情况），这事就需要使用缓存了。

## 添加依赖

Maven 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

和 Schedule 一样，SpringBoot 也自带了一个简单的缓存实现，所以是可以开箱即用的。

## 基本注解

- `@EnableCaching`：开启缓存
- `@Cacheable`：缓存
- `@CacheEvict`：清除缓存
- `@CachePut`：替换缓存
- `@CacheConfig`：配置缓存

最常用的莫过于 `@Cacheable` 和 `@CacheEvict` 了，用于添加和清除缓存。使用也非常简单，直接添加到需要的方法上即可。

```java
/**
 * @author rxliuli
 */
@Repository
public class UserDao {
    private final RowMapper<User> userRowMapper = (rs, rowNum) -> new User(
            rs.getInt("id"),
            rs.getString("name"),
            rs.getInt("age"),
            rs.getBoolean("sex")
    );
    @Autowired
    private JdbcTemplate jdbcTemplate;
    ;

    /**
     * 根据 id 查询用户
     * 使用 {@code @Cacheable} 缓存，默认按照参数的 hashcode
     * 下面的相当于 {@code @Cacheable(value = "findById", key = "#id.hashCode()")}
     *
     * @return 查询到的用户
     */
    @Cacheable(value = "findById")
    public User findById(Integer id) {
        return jdbcTemplate.queryForObject("select * from user where id = ?", new Object[]{id}, userRowMapper);
    }

    /**
     * 根据 id 更新用户
     *
     * @param user 要更新的用户
     * @return 更新的受影响行数
     */
    @CacheEvict("findById")
    public int updateById(User user) {
        return jdbcTemplate.update("update user\n" +
                        "set\n" +
                        "  name = ?,\n" +
                        "  age  = ?,\n" +
                        "  sex  = ?\n" +
                        "where id = ?;",
                user.getName(),
                user.getAge(),
                user.getSex(),
                user.getId());
    }
}
```